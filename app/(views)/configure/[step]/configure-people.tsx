"use client";
import Modal from "@/app/components/modal";
import { Person } from "@/app/lib/types/Person";
import React, { useState } from "react";
import ConfigurePerson from "./configure-person";
import { Button } from "@/app/components/button";
import { useStorage } from "@/app/lib/hooks/useStorage";

const ConfigurePeople = () => {
  const [people, setPeople] = useStorage<Person[]>("people");

  const [editingItem, setEditingItem] = useState<Person | undefined>();

  const addItem = (item: Person) => {
    const index = people?.findIndex((x) => x.guid == item.guid);
    if (index < 0) {
      setPeople([...people, item]);
    } else {
      const copy = [...people];
      copy[index] = item;
      setPeople(copy);
    }
  };

  const editItem = (value?: Person) => {
    setEditingItem(value);
    setIsModalOpen(true);
  };

  const removeItem = (item: Person) => {
    const index = people?.findIndex((x) => x.guid == item.guid);
    const copy = [...people];
    copy.splice(index);
    setPeople(copy);
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} hideButton>
        <ConfigurePerson
          onSave={(value) => {
            addItem(value);
            console.log(value);
            closeModal();
          }}
          onCancel={closeModal}
          onRemove={removeItem}
          initialValue={editingItem}
        />
      </Modal>
      <div className="grid-cols-5 grid gap-4 mb-6">
        {people.map((item, index) => (
          <Button
            key={index}
            className="w-16 h-16 border-2 border-gray-200 rounded-lg text-center"
            onClick={() => editItem(item)}
          >
            {item?.name}
          </Button>
        ))}
        <button
          className="w-16 h-16 bg-blue-500 text-white font-bold rounded-lg text-center text-6xl"
          onClick={() => editItem()}
        >
          +
        </button>
      </div>
    </>
  );
};

export default ConfigurePeople;
