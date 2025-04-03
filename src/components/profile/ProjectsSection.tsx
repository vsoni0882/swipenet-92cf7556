
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash, Globe, Github, Plus } from "lucide-react";

interface ProjectsSectionProps {
  isEditing: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isEditing }) => {
  // In a real app, this would be fetched from the database
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Built a full-featured e-commerce platform with React, Node.js, and MongoDB. Implemented user authentication, product catalog, shopping cart, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com/ecommerce",
      githubUrl: "https://github.com/example/ecommerce",
      image: "https://placehold.co/300x200"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Developed a task management application with drag-and-drop functionality, user roles, and real-time updates using Socket.io.",
      technologies: ["React", "Express", "PostgreSQL", "Socket.io"],
      liveUrl: "https://example.com/tasks",
      githubUrl: "https://github.com/example/tasks",
      image: "https://placehold.co/300x200"
    },
  ]);
  
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    image: ""
  });
  
  const addProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(",").map(t => t.trim()),
        liveUrl: newProject.liveUrl,
        githubUrl: newProject.githubUrl,
        image: newProject.image || "https://placehold.co/300x200"
      }
    ]);
    
    setNewProject({
      title: "",
      description: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      image: ""
    });
    
    setIsAddingProject(false);
  };
  
  const removeProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        
        {isEditing && !isAddingProject && (
          <Button onClick={() => setIsAddingProject(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Project
          </Button>
        )}
      </div>
      
      {isEditing && isAddingProject && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Project title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Project description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
              <Input
                placeholder="React, Node.js, MongoDB"
                value={newProject.technologies}
                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Live URL</label>
                <Input
                  placeholder="https://example.com"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <Input
                  placeholder="https://github.com/example"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={newProject.image}
                onChange={(e) => setNewProject({...newProject, image: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingProject(false)}>Cancel</Button>
            <Button onClick={addProject}>Add Project</Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="aspect-video overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-destructive" 
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
