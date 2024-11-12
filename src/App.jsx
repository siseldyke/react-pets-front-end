// src/App.jsx
import { useState, useEffect } from 'react';
import * as petService from './services/petService'

import PetList from './components/PetList';
import PetDetail from './components/PetDetail';



const App = () => {

  const [petList, setPetList] = useState([])
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false)
    
    useEffect(() => {
      const fetchPets = async () => {
        try {
          const pets = await petService.index();
  
          if (pets.error) {
            throw new Error(pets.error);
          }
  
          setPetList(pets);
        } catch (error) {
          console.log(error);
        }
        
      };
  
      fetchPets();
    }, []);

    const updateSelected = (pet) =>{
      setSelected(pet)
    }

    const handleFormView = () => {
      setIsFormOpen(!isFormOpen)
    }

  return (
    <>
    <PetList petList={petList} 
    updateSelected={updateSelected}
    handleFormView={handleFormView}
    />;
    <PetDetail selected={selected} />
    </>
  )
};

export default App;
