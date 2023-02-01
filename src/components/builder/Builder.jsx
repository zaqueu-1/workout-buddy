import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import React from 'react'
import './builder.css'
import { MdAddBox, MdDelete, MdEdit} from 'react-icons/md'

function Builder() {

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [exercises, setExercises] = useState(() => {
        const storedExercises = localStorage.getItem("exercises");
        return storedExercises ? JSON.parse(storedExercises) : [];
      });

    const handleSubmit = (e) => {
        e.preventDefault();

        let newExercise = {
            exerciseName: exercise,
            setsNum: sets,
            repsNum: reps,
            id: Date.now(),
        }
    
        if (!exercise || !sets || !reps) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        setExercises([...exercises, newExercise])
        localStorage.setItem("exercises", JSON.stringify([...exercises, newExercise]));
    }

    const [selectedExercise, setSelectedExercise] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);

    const editExercise = (id) => {
        const selected = exercises[id];

        setSelectedExercise(selected);
        setShowEditForm(true);
    };
    
    const updateExercise = (e) => {
        e.preventDefault();

        const exerciseToEdit = { exerciseName: exercise, setsNum: sets, repsNum: reps };
        const newExercises = [...exercises];
        
        newExercises[exercises.indexOf(selectedExercise)] = exerciseToEdit;

        localStorage.setItem('exercises', JSON.stringify(newExercises));
        setExercises(newExercises);
        setShowEditForm(false);
    };
    
    const deleteExercise = (id) => {
        const updatedExercises = exercises.filter((ex) => ex.id !== id)
        setExercises(updatedExercises)

        localStorage.setItem("exercises", JSON.stringify(updatedExercises))
    }
      
  return (
    <div>
    {showEditForm ? (
        <div>
            <form className="inputs-container" onSubmit={updateExercise}>
                <input className='exercise-input' 
                        type="text"
                        placeholder='Nome do exercício' 
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)} />
                <div className='sets-reps-container'>
                    <input className='sets-input'
                            type="number"
                            placeholder='séries'
                            min='1'
                            value={sets}
                            onChange={(e) => setSets(e.target.value)} />
                    <input className='reps-input' 
                            type="number"
                            placeholder='repetições'
                            min='1'
                            value={reps}
                            onChange={(e) => setReps(e.target.value)} />
                    <button className='update-btn' type="submit">Atualizar</button>
                    <button className='cancel-btn' onClick={() => showEditForm(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    ) : (
        <div>
            <form className="inputs-container" onSubmit={handleSubmit}>
                <input className='exercise-input' 
                        type="text" 
                        placeholder='Digite o nome do exercício' 
                        name='exercise'
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)} />
                <div className='sets-reps-container'>
                    <input className='sets-input' 
                            type='number' 
                            placeholder='séries'
                            min='1'
                            name='sets'
                            value={sets} 
                            onChange={(e) => setSets(e.target.value)} />
                    <input className='reps-input' 
                            type='number' 
                            placeholder='repetições'
                            min='1'
                            name='reps'
                            value={reps} 
                            onChange={(e) => setReps(e.target.value)} />
                    <button className='submit-btn' type="submit" ><MdAddBox /></button>
                </div>
            </form>
        </div>)}

        <div className="preview-container">
                {exercises.map((ex) => (
                <div className='exercise-list' key={ex.id}>
                    <div className={showEditForm ? 'exercise selected' : 'exercise'} >
                        <p className="exercise-name">{ex.exerciseName}</p>
                        <p className="sets-number">{ex.setsNum} x {ex.repsNum}</p>
                    </div>
                    <div className="controls">
                        <button className="delete-btn" onClick={() => deleteExercise(ex.id)}><MdDelete /></button>
                        <button className="edit-btn" onClick={(e) => editExercise(e, ex.id)}><MdEdit /></button>
                    </div>
                </div>
                ))}
        </div>
    </div>
  )
}

export default Builder