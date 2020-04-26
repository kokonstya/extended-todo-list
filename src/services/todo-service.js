export default class TodoService {

    data = [
        {
            id: 1,
            title: 'todo list 1',
            todos: [
                {id: 1, text: 'todo 1-1', important: false, done: false, date: 1587815200593},
                {id: 2, text: 'todo 1-2', important: false, done: false, date: 1687815399008},
                {id: 3, text: 'todo 1-3', important: false, done: false, date: 1111111111111},
                {id: 4, text: 'todo 1-4', important: false, done: false, date: 1111111111111},
                {id: 5, text: 'todo 1-5', important: false, done: false, date: 1111111111111}]
        }, {
            id: 2,
            title: 'todo list 2',
            todos: [
                {id: 1, text: 'todo 2-1', important: false, done: false, date: 1111111111111},
                {id: 2, text: 'todo 2-2', important: false, done: false, date: 1111111111111},
                {id: 3, text: 'todo 2-3', important: false, done: false, date: 1111111111111},
                {id: 4, text: 'todo 2-4', important: false, done: false, date: 1111111111111},
                {id: 5, text: 'todo 2-5', important: false, done: false, date: 1111111111111}]
        }, {
            id: 3,
            title: 'todo list 3',
            todos: [
                {id: 1, text: 'todo 3-1', important: false, done: false, date: 1111111111111},
                {id: 2, text: 'todo 3-2', important: false, done: false, date: 1111111111111},
                {id: 3, text: 'todo 3-3', important: false, done: false, date: 1111111111111},
                {id: 4, text: 'todo 3-4', important: false, done: false, date: 1111111111111},
                {id: 5, text: 'todo 3-5', important: false, done: false, date: 1111111111111}]
        }, {
            id: 4,
            title: 'todo list 4',
            todos: [
                {id: 1, text: 'todo 4-1', important: false, done: false, date: 1111111111111},
                {id: 2, text: 'todo 4-2', important: false, done: false, date: 1111111111111},
                {id: 3, text: 'todo 4-3', important: false, done: false, date: 1111111111111},
                {id: 4, text: 'todo 4-4', important: false, done: false, date: 1111111111111},
                {id: 5, text: 'todo 4-5', important: false, done: false, date: 1111111111111}]
        },
    ];

    getTodoLists() {
        return new Promise((resolve, reject) => {
            if (!localStorage.getItem('data-todo-26042020') ||
                localStorage.getItem('data-todo-26042020').length < 3) {
                setTimeout(() => {
                    if (Math.random() > 0.90) {
                        reject(new Error('Can`t load todo =( '));
                    } else {
                        resolve(this.data);
                    }
                }, 1500);
            } else {
                const data = localStorage.getItem('data-todo-26042020');
                resolve(JSON.parse(data));
                console.log(JSON.parse(data))
            }

        });
    }
}
