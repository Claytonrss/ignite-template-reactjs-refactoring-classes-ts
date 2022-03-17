import { Food } from 'components/Food'
import { ModalAddFood } from 'components/ModalAddFood'
import { ModalEditFood } from 'components/ModalEditFood'
import { useEffect, useState } from 'react'
import { FoodInterface } from 'types'
import Header from '../../components/Header'
import api from '../../services/api'
import { FoodsContainer } from './styles'

interface DashboardProps {
  foods: FoodInterface[]
  editingFood: {}
  modalOpen: false
  editModalOpen: false
}

export function Dashboard(props: DashboardProps) {
  const [foods, setFoods] = useState<FoodInterface[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState<FoodInterface>(
    {} as FoodInterface
  )

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods')
      setFoods(response.data)
    }
    getFoods()
  }, [])

  async function handleAddFood(food: FoodInterface) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: FoodInterface) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter(food => food.id !== id)
    setFoods(foodsFiltered)
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food: FoodInterface) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
