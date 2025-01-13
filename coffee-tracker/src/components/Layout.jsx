import { useState } from "react"
import Authentication from "./Authentication"
import Modal from "./Modal"

export default function Layout(props) {
    const { children } = props

    const [showModal, setShowModal] = useState(false);

    const header = (
        <header>
            <div>
                <h1 className="text-gradient">Coffee-Tracker</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button onClick={() => {setShowModal(true)}}>
                <p>Sign up free</p>
                <i className="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p>This <span>Coffee Tracker</span> was made by <a href="https://github.com/sp3cia1">Pranjal</a></p>
        </footer>
    )

    return(
        <>
            {showModal && (
                <Modal handleCloseModal = {() => {setShowModal(false)}}>
                    <Authentication/>
                </Modal>
            )}

            {header}
            <main>
                {children}
            </main>
            {footer}
        </>
    )
}