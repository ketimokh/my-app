import { useEffect, useRef, useState } from "react"



const _todoItems = [
    { id: 1, title: 'test 1', completed: false },
    { id: 2, title: 'test 2', completed: true },
    { id: 3, title: 'test 3', completed: false }
]

export default function TodoApp() {
    const [todoItems, settodoItems] = useState(_todoItems)
    const [value, setvalue] = useState('')
    const toDoFocus = useRef()


    function addNewItem(e) {
        e.preventDefault()

        let newToDoItem = { id: Date.now(), title: value, completed: false }

        settodoItems([
            ...todoItems,
            newToDoItem
        ])
        setvalue('')
    }

    function onToDoChange(id) {
        let newItems = todoItems.map(el => {
            if (el.id === id) {
                el.completed = !el.completed
            }
            return el
        })
        settodoItems(newItems)
    }

    function handleRemove(id) {
        const todoItemsRemove = todoItems.filter((el) => el.id !== id)

        settodoItems(todoItemsRemove)
    }

    useEffect(() => {
        toDoFocus.current.focus()
    }, [])

    return (
        <div>
            <h1> my tasks</h1>
            <div>
                <form action='' onSubmit={addNewItem}>
                    <input
                        ref={toDoFocus}
                        type='text'
                        name='item'
                        id='item'
                        value={value}
                        onChange={e => setvalue(e.target.value)}
                    />
                    <button type='submit'> Add Items </button>
                </form>
            </div>
            <ul>
                {
                    todoItems.map(el => (
                        <li className={el.completed ? 'completed' : ''} >
                            <input
                                type='checkbox'
                                checked={el.completed}
                                onChange={() => {
                                    onToDoChange(el.id)
                                }}
                            />
                            <span>{el.title}</span>
                            <button type='button' onClick={() => handleRemove(el.id)}>Delete</button>
                        </li>
                    ))
                }

            </ul>
        </div>

    )
}