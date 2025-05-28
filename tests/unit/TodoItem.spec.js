import { shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

describe('TodoItem.vue', () => {
  it('displays the due date if present in the todo prop', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false, dueDate: '2024-12-31' };
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo }
    });
    const dueDateSpan = wrapper.find('.due-date');
    expect(dueDateSpan.exists()).toBe(true);
    expect(dueDateSpan.text()).toContain('(Due: 2024-12-31)');
  });

  it('does not display the due date if it is null in the todo prop', () => {
    const todo = { id: 2, title: 'Test Todo No Date', completed: false, dueDate: null };
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo }
    });
    const dueDateSpan = wrapper.find('.due-date');
    expect(dueDateSpan.exists()).toBe(false);
  });

  it('does not display the due date if it is an empty string in the todo prop', () => {
    const todo = { id: 3, title: 'Test Todo Empty Date', completed: false, dueDate: '' };
    const wrapper = shallowMount(TodoItem, {
      propsData: { todo }
    });
    const dueDateSpan = wrapper.find('.due-date');
    expect(dueDateSpan.exists()).toBe(false);
  });

  it('renders todo title', () => {
    const todo = { id: 4, title: 'A Todo Item', completed: false, dueDate: null };
    const wrapper = shallowMount(TodoItem, {
        propsData: { todo }
    });
    expect(wrapper.text()).toContain('A Todo Item');
  });

  it('emits del-todo event when delete button is clicked', async () => {
    const todo = { id: 5, title: 'To be deleted', completed: false, dueDate: null };
    const wrapper = shallowMount(TodoItem, {
        propsData: { todo }
    });
    await wrapper.find('button.del').trigger('click');
    expect(wrapper.emitted('del-todo')).toBeTruthy();
    expect(wrapper.emitted('del-todo')[0]).toEqual([5]);
  });

  it('marks todo as complete/incomplete on checkbox change', async () => {
    const todo = { id: 6, title: 'Toggle complete', completed: false, dueDate: null };
    const wrapper = shallowMount(TodoItem, {
        propsData: { todo }
    });
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setChecked();
    expect(todo.completed).toBe(true);
    await checkbox.setChecked(false);
    expect(todo.completed).toBe(false);
  });
});
