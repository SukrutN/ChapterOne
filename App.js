// Sukrut Nadigotti
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";

// Task component represents a single task item with complete, delete, and expand/collapse functionality
function Task({ task, toggleTask, deleteTask }) {
  // State to manage whether the task description is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expand/collapse state
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View style={styles.task}>
      <TouchableOpacity
        onPress={toggleTask}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        {/* Display a checkmark or X based on the task's completion status */}
        <Text
          style={[
            styles.statusIndicator,
            task.completed
              ? styles.completedIndicator
              : styles.incompleteIndicator,
          ]}
        >
          {task.completed ? "✓" : "✕"}
        </Text>
        <View style={styles.taskTextContainer}>
          {/* Task description with conditional styling for completed tasks */}
          <Text
            style={[
              styles.taskDescription,
              task.completed ? styles.completedTask : styles.incompleteTask,
            ]}
            numberOfLines={isExpanded ? undefined : 1} // Show all lines if expanded, otherwise show one line
            ellipsizeMode="tail" // Add ellipsis at the end if text is truncated
          >
            {task.description}
          </Text>
          {/* "More" button to expand/collapse the task description for longer texts */}
          {task.description.length > 30 && (
            <TouchableOpacity
              onPress={toggleExpand}
              style={styles.expandButton}
            >
              <Text style={styles.expandButtonText}>
                {isExpanded ? "Less" : "More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {/* Delete button for the task */}
      <TouchableOpacity onPress={deleteTask} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

// TaskList component renders a list of tasks using a FlatList component
function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item, index }) => (
        // Render each task using the Task component
        <Task
          task={item}
          toggleTask={() => toggleTask(index)}
          deleteTask={() => deleteTask(index)}
        />
      )}
      keyExtractor={(item, index) => index.toString()} // Key extractor for list performance
    />
  );
}

// Main App component where tasks are managed and the user interface is rendered
export default function App() {
  // State for the list of tasks and the new task description
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTaskDescription.trim() !== "") {
      setTasks([
        ...tasks,
        { description: newTaskDescription, completed: false },
      ]);
      setNewTaskDescription("");
    }
  };

  // Function to toggle the completion status of a task
  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {/* Application title */}
      <Text style={styles.title}>Chapter One Task Manager</Text>
      {/* Input field and add button for new tasks */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          placeholder="Enter a new task!"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {/* List of tasks */}
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </View>
  );
}

// StyleSheet for styling various components of the app
const styles = StyleSheet.create({
  // Container for the whole app
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 30,
  },
  // Title style
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  // Style for each task item
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    marginBottom: 10,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Styles for the status indicator (checkmark or X)
  statusIndicator: {
    fontSize: 20,
    marginRight: 10,
    width: 24,
    textAlign: "center",
  },
  completedIndicator: {
    color: "#4CAF50",
  },
  incompleteIndicator: {
    color: "#F44336",
  },
  // Style for task description
  taskDescription: {
    flex: 1,
  },
  // Style for completed task description
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  // Container for task text and expand/collapse button
  taskTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  // Button to expand/collapse task description
  expandButton: {
    marginLeft: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 5,
  },
  // Text for expand/collapse button
  expandButtonText: {
    color: "#555",
    fontSize: 12,
  },
  // Container for input field and add button
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "95%",
  },
  // Input field style
  input: {
    flex: 1,
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  // Add button style
  addButton: {
    width: 50,
    backgroundColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  // Text style for add button
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  // Delete button style
  deleteButton: {
    padding: 5,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  // Text style for delete button
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
