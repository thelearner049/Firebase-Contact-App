import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email("Invalid email!").required("Email is required."),
});

const ModalForm = ({ isOpen, onClose, onOpen, isUpdate, contact }) => {
  async function addContact(contact) {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast("✅Contact Added Successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateContact(contact, id) {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast("✅Contact Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <Field name="name" className="h-8 rounded-sm border p-2"></Field>
              <div className="text-xs text-red-600">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <Field name="email" className="h-8 rounded-sm border p-2"></Field>
              <div className="text-xs text-red-600">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="bg-blue-light cursor-pointer self-center rounded-sm px-3 py-1.5 text-white">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalForm;
