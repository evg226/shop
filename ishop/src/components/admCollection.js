import React, {useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCategoriesFull} from "../store/selectors";
import "./adm.css";
import {
    createCategoryDB,
    createCollectionDB, deleteCategoryDB,
    deleteCollectionDB, updateCategoryDB,
    updateCollection,
    updateCollectionDB
} from "../store/action";
import {AdmProducts} from "./admProduct";

export const AdmCollection=()=> {
    const collections=useSelector(getCategoriesFull);
    const dispatch=useDispatch();
    const [showModal,setShowModal]=useState(false);
    const [showCategories,setShowCategories]=useState(false);
    const handleAdd=(name)=>{
        name&&dispatch(createCollectionDB(name));
        setShowModal(false);
    }
    return (
        <div>
            <div className="adm__row adm__caption">
                <div className="adm__col adm__addnew" onClick={()=>setShowModal(true)}>+</div>
                <div className="adm__col">ID</div>
                <div className="adm__col">COLLECTION NAME</div>
            </div>
            {collections.length&&collections.map(item=>
                <Item key={item.id} item={item} showCategories={showCategories}  setShowCategories={setShowCategories}/>
            )}
            {showModal && <Modal type="add" data={{name:""}} show={setShowModal} action={handleAdd}/>}
        </div>
    );
}

const Item=({item,collectionId,categoryId, showCategories,setShowCategories,showProducts,setShowProducts})=>{
    const dispatch=useDispatch();

    const [showModal,setShowModal]=useState(false);
    const handleDelete=()=>{
        if(window.confirm(`Do you what to delete ${item.name} from database?`)){
            if(collectionId){
                dispatch(deleteCategoryDB(item.id,collectionId));
            }else {
                dispatch(deleteCollectionDB(item.id));
            }
        };
    }
    const handleUpdate=(newName)=>{
        if(collectionId){
            dispatch(updateCategoryDB(item.id,newName,collectionId));
        }else {
            dispatch(updateCollectionDB(item.id, newName));
        }
        setShowModal(false);
    }

    const handleOpenItem =(id)=>{
        if (!collectionId){
            setShowCategories((showCategories===item.id)?false:id);
        } else {
            setShowProducts((showProducts===item.id)?false:id);
        }
    }
    return (
        <>
        <div  className="adm__row adm__row_data" onClick={(e)=>e.target.id!=="adm__col_focused"&&setShowModal(true)}>
                <div id="adm__col_focused" className="adm__col" onClick={()=>handleOpenItem(item.id)}>
                    {!collectionId?
                        (showCategories===item.id ? "-" : "+")
                        :
                        (showProducts===item.id ? "-" : "+")
                    }
                </div>
            <div className="adm__col adm">{item.id}</div>
            <div className="adm__col">{item.name}</div>
            <div id="adm__col_focused" className="adm__col" onClick={handleDelete}>X</div>

        </div>
            {(showCategories===item.id)&&<AdmCategories categories={item.categories} collectionId={item.id}/>}
            {(showProducts===item.id)&&<AdmProducts categoryId={item.id} />}
            {showModal && <Modal data={item} show={setShowModal} action={handleUpdate}/>}
        </>
    )
}

const Modal=({data,show,action,type})=>{
    const [newName,setNewName]=useState(data.name);
    return (
        <div id="adm__back" onClick={(e)=>e.target.id==="adm__back"&&show(false)}>
           <div className="adm__modal">
               {type==="add" ? <h3>Create new </h3> : <h3>Update: {data.name}</h3>}
                <p>New name:</p>
                <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
                <div className="adm__modal_buttons">
                    <div onClick={(e)=>action(newName)}>{type==="add"?"Create":"Update"}</div>
                    <div onClick={()=>show(false)}>Cancel</div>
                </div>
           </div>
       </div>
    )
}

const AdmCategories = ({categories,collectionId})=>{
    const dispatch=useDispatch();
    const [showModal,setShowModal]=useState(false);
    const [showProducts,setShowProducts]=useState(false);
    const handleAdd=(name)=>{
        name&&dispatch(createCategoryDB(name,collectionId));
        setShowModal(false);
    }
    return (
        <div className="adm__inner_table">
            <div className="adm__row adm__caption">
                <div className="adm__col adm__addnew" onClick={()=>setShowModal(true)} >+</div>
                <div className="adm__col">ID</div>
                <div className="adm__col">CATEGORY NAME</div>
            </div>
            {categories&&categories.length?categories.map(item=>
                <Item key={item.id} item={item} collectionId={collectionId} categoryId={categories.id}
                      showProducts={showProducts} setShowProducts={setShowProducts} />
            ):""}
            {showModal && <Modal type="add" data={{name:""}} show={setShowModal} action={handleAdd}/>}
        </div>
    )
}

