import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"
import { coffeeOptions } from "../utils"

export default function CoffeeForm(props){
    const {isAuthenticated} = props
    const [showModal, setShowModal] = useState(false)
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)
    const [selectedCoffee, setSelectedCoffee] = useState(null)
    const [coffeeCost, setCoffeeCost] = useState(0)
    const [hour,sethour] = useState(0)
    const [min,setMin] = useState(0)

    function handleSubmitForm() {
        if(!isAuthenticated){
            setShowModal(true);
            return
        }
        console.log(selectedCoffee, coffeeCost, hour, min)
    }

    return(
        <>
            {showModal && (
                <Modal handleCloseModal = {() => {setShowModal(false)}}>
                    <Authentication handleCloseModal = {() => {setShowModal(false)}} />
                </Modal>
            )}
            <div className = "section-header">
                <i className = "fa-solid fa-pencil" />
                <h2>Start Tracking Today</h2>
            </div>  
            <h4>Select Coffee type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0,5).map((option, optionIndex) => {
                    return(
                        <button onClick = {() => {
                            setSelectedCoffee(option.name)
                            setShowCoffeeTypes(false)
                        }} className={"button-card " + (option.name === selectedCoffee ? 'coffee-button-selected' : ' ')} key={optionIndex}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine} mg</p>
                        </button>
                    )
                })}
                <button onClick={() => {
                    setShowCoffeeTypes(true)
                    setSelectedCoffee(null)
                }} className= {"button-card " + (showCoffeeTypes ? 'coffee-button-selected' : ' ')}>
                    <h4>Other</h4>
                </button>
            </div>

            {showCoffeeTypes && (
                <select onChange={(e) => {
                    setSelectedCoffee(e.target.value)
                }} name="coffee-list" id="coffee-list">
                    <option value={null}>Select type</option>
                    {
                        coffeeOptions.map((option,optionIndex) => {
                            return(
                                <option value={option.name} key = {optionIndex}>
                                    {option.name} ({option.caffeine}mg)
                                </option>
                            )
                        })
                    }
                </select>
            )}

            <h4>Add the cost ($)</h4>
            {/* stop this from going below 0 */}
            <input className="w-full" type="number" value = {coffeeCost} onChange = {(e) => {
                setCoffeeCost(e.target.value)
            }} placeholder="4.50" /> 
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange = {(e) => {
                        sethour(e.target.value)
                    }} id="hours-select">
                        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
                            return (
                                <option value={hour} key={hourIndex}>{hour}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <h6>Mins</h6>
                    <select onChange = {(e) => {
                        setMin(e.target.value)
                    }} id="mins-select">
                        {[0,5,10,15,30,45].map((min, minIndex) => {
                            return (
                                <option value={min} key={minIndex}>{min}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button onClick = {handleSubmitForm}>
                <p>Add the entry</p>
            </button>
        </>
    )
}