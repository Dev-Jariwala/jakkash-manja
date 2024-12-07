import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CollectionContext } from "../store/collectionContext";
import {
  ctableBtn,
  ctableKeys,
  ctableName,
  ctableTHs,
} from "../assets/props/tableProps/ctableProps";
import {
  collectionCreate,
  collectionDelete,
  collectionUpdate,
  fetchAllCollections,
  getCollectionDetails,
} from "../controllers/collection";
import Modal from "../components/modal/Modal";
import DeleteCollection from "../components/collection/DeleteCollection";
import NewCollection from "../components/collection/NewCollection";

import EditCollection from "../components/collection/EditCollection";

import Loader1 from "../components/loaders/Loader1";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";

const CollectionPage = () => {
  const { collections, setCollections, activeColl, fetching } =
    useContext(CollectionContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetching]);
  useEffect(() => {
    // Set focus on the "Delete" button when the delete modal opens
    if (formState.status === "deleteCollection" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "editCollection" && focusRef.current) {
      focusRef.current.focus();
    } else if (formState.status === "newCollection" && focusRef.current) {
      focusRef.current.focus();
    }
  }, [formState.status]);
  function onNewCollection() {
    setFormState({
      status: "newCollection",
      formData: { collectionName: "", addProducts: true },
    });
  }
  const reRenderCollections = async () => {
    try {
      setCollections(await fetchAllCollections());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Error updating products");
    }
  };
  // Function to handle delete confirmation
  const handleDeleteConfirmation = async (e, collId) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (collId === activeColl._id) {
        return toast.warn("Active Collection cannot be deleted.");
      }
      const res = await getCollectionDetails(collId);
      setFormState({ status: "deleteCollection", formData: res });
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting collection");
    } finally {
      setLoading(false);
    }
  };
  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      // For collectionDelete
      await toast.promise(collectionDelete(formState.formData._id), {
        pending: "Deleting Collection...",
        success: "Collection deleted successfully! 👌",
        error: "Error deleting Collection. Please try again. 🤯",
      });
      await reRenderCollections();
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting collection");
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel/delete without confirmation
  const cancelDelete = () => {
    setFormState({ status: "", formData: {} });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const repeteColl = collections.find(
        (coll) => coll.collectionName === formState.formData.collectionName
      );
      if (repeteColl) {
        return toast.warn("Collection already exists.");
      }
      // For collectionCreate
      await toast.promise(collectionCreate(formState.formData), {
        pending: "Creating Collection...",
        success: "Collection created successfully! 👌",
        error: "Error creating Collection. 🤯",
      });
      await reRenderCollections();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(e, collectionId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      // For collectionUpdate
      await toast.promise(collectionUpdate(collectionId, formData), {
        pending: "Editing Collection...",
        success: "Collection edited successfully! 👌",
        error: "Error editing Collection. Please try again. 🤯",
      });
      await reRenderCollections();
    } catch (error) {
      console.log(error);
      toast.error("Error editing Collection");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, collectionId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await getCollectionDetails(collectionId);
      setFormState({ status: "editCollection", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  const actions = [
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          <span className="material-icons text-sm">edit</span>
        </span>
      ),
      classNames: [],
      onSmash: onEdit,
    },
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
          <span className="material-icons text-sm">delete</span>
        </span>
      ),
      classNames: [],
      onSmash: handleDeleteConfirmation,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {/* Confirmation Modal for Delete */}
      {formState.status === "deleteCollection" && (
        <Modal
          isOpen={formState.status === "deleteCollection"}
          onClose={cancelDelete}
          title={"Drop Collection :"}
        >
          <DeleteCollection
            ref={focusRef}
            collectionName={formState.formData.collectionName}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}
      {formState.status === "newCollection" && (
        <NewCollection
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
        />
      )}
      {formState.status === "editCollection" && (
        <EditCollection
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}

      <PageTitle pageName={"Collection"}>
        <Table2Wrapper
          rows={collections}
          tableName={ctableName}
          tableBtn={ctableBtn}
          onTableBtn={onNewCollection}
          ths={ctableTHs}
          actions={actions}
          mainKeys={ctableKeys}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default CollectionPage;
