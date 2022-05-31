import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch')
        ],
    }

    createItem(label) {
        return { label: label, done: false, important: false, id: this.maxId++ }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id)
            const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)]

            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newArray = [...todoData, this.createItem(text)]

            return {
                todoData: newArray
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id)
        const oldItem = arr[index];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }

        return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
    }

    onSearchChange = (e) => {
        this.setState(({ todoData }) => {
            const newArray = todoData.filter((el) => el.label.toLowerCase().includes(e.target.value.toLowerCase()))

            return {
                todoData: newArray
            }
        })
    }

    render() {
        const { todoData } = this.state
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onChange={this.onSearchChange} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem} />
            </div>
        );
    }
};