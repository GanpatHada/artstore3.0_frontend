import React, { useEffect, useRef, useState } from "react";
import "./NoteModal.css";
import { RxCross1 } from "react-icons/rx";
import SpinLoader from "../../spin-loader/SpinLoader";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useUser } from "../../../hooks/useUser";
import {
  fetchAddNoteInWishlistProduct,
  fetchDeleteNoteFromWishlistProduct,
} from "../../../services/UserService";
import { toast } from "react-toastify";

const PrioritySelect = ({ note, setNote }) => {
  const list = ["Low", "Medium", "High"];

  const handleChange = (e) =>
    setNote((prev) => ({
      ...prev,
      priority: e.target.value,
    }));

  return (
    <select id="priority" value={note.priority} onChange={handleChange}>
      {list.map((item) => {
        return <option value={item}>{item}</option>;
      })}
    </select>
  );
};

const NoteModal = ({ closeModal, wishlistId, productId, initialNote }) => {
  const {
    user,
    setUserDetails,
    addNoteToWishlistItem,
    deleteNoteFromWishlistItem,
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({
    comment: "",
    priority: "Medium",
  });

  const handleFormSubmit = async (e) => {
    const mode = initialNote ? "PUT" : "POST";
    e.preventDefault();
    try {
      setLoading(true);
      const data = await fetchAddNoteInWishlistProduct(
        user,
        setUserDetails,
        wishlistId,
        productId,
        note,
        mode
      );
      addNoteToWishlistItem(data);
      toast.info(`Note ${initialNote?'edited':"added"} successfully`)
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const data = await fetchDeleteNoteFromWishlistProduct(
        user,
        setUserDetails,
        wishlistId,
        productId
      );
      deleteNoteFromWishlistItem(data);
      toast.info("Note has been deleted")
    } catch (error) {
      toast.error(error.message || "Something went wrong while deleting note");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    if (initialNote) {
      const { comment, priority } = initialNote;
      setNote({
        comment,
        priority,
      });
    }
  }, initialNote);

  const modalRef = useRef(null);

  useClickOutside(modalRef, closeModal);
  return (
    <div className="layover">
      <div className="modal" id="note-modal" ref={modalRef}>
        {loading && <SpinLoader />}
        <header>
          <h4>Add Note</h4>
          <button onClick={closeModal} className="all-centered">
            <RxCross1 />
          </button>
        </header>
        <main>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="comment">Comment</label>
              <div>
                <textarea
                  value={note.comment}
                  id="comment"
                  maxLength={200}
                  onChange={(e) =>
                    setNote((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                ></textarea>
                <p id="comment-count">
                  Remaining {200 - note.comment.length} characters
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="priority">Priority</label>
              <div>
                {" "}
                <PrioritySelect note={note} setNote={setNote} />
              </div>
            </div>
            <div className="action">
              <div>
                {initialNote && (
                  <button onClick={handleDeleteNote} className="secondary-btn">Delete Note</button>
                )}
              </div>
              <div>
                <button className="secondary-btn">Clear</button>
                <button type="submit" className="primary-btn">
                  Save
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default NoteModal;
