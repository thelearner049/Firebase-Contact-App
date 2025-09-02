import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Searchbox from "./components/Searchbox";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ContactCard } from "./components/ContactCard";
import Modal from "./components/Modal";
import ModalForm from "./components/ModalForm";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "./components/NotFound";

function App() {
  let [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();

  async function filterContacts(e) {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase()),
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  }

  useEffect(() => {
    async function getContacts() {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    }

    getContacts();
  }, []);

  return (
    <div className="max-auto max-w-[370px]">
      <Navbar />
      <Searchbox onOpen={onOpen} filterContacts={filterContacts} />
      <div>
        {contacts.length <= 0 ? (
          <NotFound />
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
      </div>
      <ModalForm isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
