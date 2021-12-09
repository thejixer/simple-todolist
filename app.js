const input = document.getElementById('input')
const container = document.getElementById('container')
const btn = document.getElementById('btn')
const searchInput = document.getElementById('search')

const toDoList = [
  {
    text: 'walk the dog',
    done: false,
  },
  {
    text: 'feed the cat',
    done: false
  }
]

const addToDo = () => {
  const userInput = input.value
  if (!userInput) return // end of execution

  toDoList.push({
    text: userInput,
    done: false
  })

  input.value = ''

  updateUI()
}

const updateUI = () => {

  container.innerHTML = ''
                              // accumulator
  const result = toDoList
    .filter(item => {
      return item.text.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    .reduce((acc, item, i) => {

      const string = `
        <div class="item">
          <div class="${item.done ? 'done' : ''}" style="font-size: 26px" >
            ${item.text}
          </div>
          <div style="display: flex">
            <div style="margin-right: 20px" onclick="handleDone(${i})">
              ${item.done ? 'make undone' : 'make done'}
            </div>
            <div onclick="deleteItem(${i})">
              delete
            </div>
          </div>
        </div>
      `
      return acc + string
    }, '')

  container.innerHTML = result

}

const deleteItem = index => {
  toDoList.splice(index, 1)

  updateUI()
}

const handleDone = index => {
  toDoList[index].done = !toDoList[index].done
  updateUI()
}

updateUI()

btn.addEventListener('click', addToDo)
input.addEventListener('keyup', event => {

  if (event.key === 'Enter') addToDo()
  
})
searchInput.addEventListener('keyup', updateUI)