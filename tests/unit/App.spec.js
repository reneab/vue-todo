import { shallowMount, mount } from '@vue/test-utils';
import App from '@/App.vue';
import axios from 'axios';
import flushPromises from 'flush-promises'; 

// Mock axios
jest.mock('axios');

// Mock uuid to return predictable IDs
let mockIdCounter = 1;
jest.mock('uuid', () => ({
  v4: () => `mock-uuid-${mockIdCounter++}`
}));


describe('App.vue', () => {
  beforeEach(() => {
    // Reset mockIdCounter before each test for consistent UUIDs
    mockIdCounter = 1; 
  });

  it('adds dueDate: null to todos fetched from API', async () => {
    const mockTodos = [
      { id: 1, title: 'API Todo 1', completed: false },
      { id: 2, title: 'API Todo 2', completed: true },
    ];
    axios.get.mockResolvedValue({ data: mockTodos });

    const wrapper = shallowMount(App);
    await flushPromises(); // Wait for promises like axios.get to resolve

    // The initial hardcoded todo + 2 from API
    expect(wrapper.vm.todos.length).toBe(3); 
    // Check the hardcoded todo
    expect(wrapper.vm.todos[0].title).toBe('A default, hard-coded todo');
    expect(wrapper.vm.todos[0].dueDate).toBeNull();
    // Check todos from API
    expect(wrapper.vm.todos[1].title).toBe('API Todo 1');
    expect(wrapper.vm.todos[1].dueDate).toBeNull();
    expect(wrapper.vm.todos[2].title).toBe('API Todo 2');
    expect(wrapper.vm.todos[2].dueDate).toBeNull();
  });

  it('adds a new todo with a due date to the todos array', async () => {
    // Mount is used here to interact with child components like AddTodo
    const wrapper = mount(App); 
    await flushPromises(); // Ensure created hook API call is done

    const initialTodoCount = wrapper.vm.todos.length;

    // Simulate adding a new todo via the AddTodo component
    // We need to find the AddTodo component and emit the event from it
    const addTodoComponent = wrapper.findComponent({ name: 'AddTodo' });
    
    const newTodo = {
      // id will be generated by AddTodo, title and dueDate from user input
      title: 'New Test Todo with Date',
      dueDate: '2025-01-15'
    };
    
    // Manually call addItem method as if AddTodo emitted it
    // because directly emitting from child requires more complex setup for this test
    wrapper.vm.addItem({
        id: 'mock-uuid-new', // Add a mock ID as AddTodo would
        title: newTodo.title,
        completed: false, // Default value
        dueDate: newTodo.dueDate
    });

    await wrapper.vm.$nextTick(); // Wait for DOM updates

    expect(wrapper.vm.todos.length).toBe(initialTodoCount + 1);
    const addedTodo = wrapper.vm.todos.find(todo => todo.title === 'New Test Todo with Date');
    expect(addedTodo).toBeDefined();
    expect(addedTodo.dueDate).toBe('2025-01-15');
    expect(addedTodo.id).toBe('mock-uuid-new');
  });

  it('adds a new todo without a due date (dueDate is null)', async () => {
    const wrapper = mount(App);
    await flushPromises();
    const initialTodoCount = wrapper.vm.todos.length;

    wrapper.vm.addItem({
        id: 'mock-uuid-another-new',
        title: 'New Test Todo No Date',
        completed: false,
        dueDate: null 
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.todos.length).toBe(initialTodoCount + 1);
    const addedTodo = wrapper.vm.todos.find(todo => todo.title === 'New Test Todo No Date');
    expect(addedTodo).toBeDefined();
    expect(addedTodo.dueDate).toBeNull();
  });

  it('deletes a todo item', async () => {
    const wrapper = shallowMount(App);
    await flushPromises(); // for API call

    // Add a known todo to delete
    const todoToDelete = { id: 'mock-uuid-to-delete', title: 'Delete Me', completed: false, dueDate: null };
    wrapper.vm.todos.push(todoToDelete);
    const initialTodoCount = wrapper.vm.todos.length;

    wrapper.vm.deleteItem('mock-uuid-to-delete');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.todos.length).toBe(initialTodoCount - 1);
    expect(wrapper.vm.todos.find(todo => todo.id === 'mock-uuid-to-delete')).toBeUndefined();
  });
});
