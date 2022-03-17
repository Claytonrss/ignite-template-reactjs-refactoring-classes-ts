import { FormHandles } from '@unform/core'
import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { FoodInterface } from 'types'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { Form } from './styles'

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateFood: (food: FoodInterface) => Promise<void>
  editingFood: FoodInterface
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}: ModalEditFoodProps) {
  const formRef = createRef<FormHandles>()

  async function handleSubmit(data: FoodInterface) {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
