import React, { useState } from 'react';
import { Plus, MoreHorizontal, Calendar, User, Flag } from 'lucide-react';
import { Task, Project } from '../../types';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface KanbanBoardProps {
  project: Project;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ project }) => {
  const { updateProjectTasks } = useData();
  const { user } = useAuth();
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  const getTasksByStatus = (status: string) => {
    return project.tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddTask = (status: string) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      description: '',
      status: status as any,
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      labels: []
    };

    updateProjectTasks(project.id, [...project.tasks, newTask]);
    setNewTaskTitle('');
    setShowAddTask(null);
  };

  const handleTaskMove = (taskId: string, newStatus: string) => {
    const updatedTasks = project.tasks.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus as any, updatedAt: new Date().toISOString() }
        : task
    );
    updateProjectTasks(project.id, updatedTasks);
  };

  const canManageTasks = user && (
    user.id === project.ownerId ||
    project.teamMembers.some(member => member.id === user.id)
  );

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Board</h2>
        <div className="text-sm text-gray-600">
          {project.tasks.length} tasks total
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {columns.map(column => {
          const tasks = getTasksByStatus(column.id);
          
          return (
            <div key={column.id} className="flex flex-col">
              <div className={`${column.color} rounded-lg p-3 mb-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                    {tasks.length}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3 min-h-0 overflow-y-auto">
                {tasks.map(task => (
                  <Card key={task.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {task.title}
                      </h4>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {task.description && (
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(task.priority)}`}>
                          <Flag className="h-3 w-3 inline mr-1" />
                          {task.priority}
                        </span>
                      </div>

                      {task.assigneeId && (
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <User className="h-3 w-3" />
                          <span>{task.assigneeName}</span>
                        </div>
                      )}
                    </div>

                    {task.dueDate && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {task.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.labels.map(label => (
                          <span key={label} className="px-1 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}

                    {canManageTasks && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <select
                          value={task.status}
                          onChange={(e) => handleTaskMove(task.id, e.target.value)}
                          className="w-full text-xs border border-gray-200 rounded px-2 py-1"
                        >
                          {columns.map(col => (
                            <option key={col.id} value={col.id}>{col.title}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </Card>
                ))}

                {canManageTasks && (
                  <div className="mt-3">
                    {showAddTask === column.id ? (
                      <Card className="p-3">
                        <input
                          type="text"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Enter task title..."
                          className="w-full text-sm border-none outline-none mb-2"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTask(column.id)}
                          autoFocus
                        />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddTask(column.id)}
                            className="text-xs px-3 py-1"
                          >
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowAddTask(null)}
                            className="text-xs px-3 py-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    ) : (
                      <button
                        onClick={() => setShowAddTask(column.id)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm">Add task</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;