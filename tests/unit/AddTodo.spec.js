import { shallowMount } from '@vue/test-utils';
import AddTodo from '@/components/AddTodo.vue';

describe('AddTodo.vue', () => {
  it('emits an add-todo event with title and dueDate when a date is entered', async () => {
    const wrapper = shallowMount(AddTodo);
    const titleInput = wrapper.find('input[type="text"]');
    const dateInput = wrapper.find('input[type="date"]');

    await titleInput.setValue('Test Todo');
    await dateInput.setValue('2024-12-31');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('add-todo')).toBeTruthy();
    expect(wrapper.emitted('add-todo')[0][0].title).toBe('Test Todo');
    expect(wrapper.emitted('add-todo')[0][0].dueDate).toBe('2024-12-31');
    // Check if input fields are cleared
    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.dueDate).toBe('');
  });

  it('emits an add-todo event with title and dueDate as null if no date is entered', async () => {
    const wrapper = shallowMount(AddTodo);
    const titleInput = wrapper.find('input[type="text"]');

    await titleInput.setValue('Test Todo Without Date');
    // No date is entered
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('add-todo')).toBeTruthy();
    expect(wrapper.emitted('add-todo')[0][0].title).toBe('Test Todo Without Date');
    expect(wrapper.emitted('add-todo')[0][0].dueDate).toBeNull();
     // Check if input fields are cleared
    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.dueDate).toBe('');
  });
});
