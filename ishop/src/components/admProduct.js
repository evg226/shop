import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getCategoriesFull, getProductsByCategory, getProductsPage} from "../store/selectors";
import {
    createCollectionDB,
    deleteCategoryDB,
    deleteCollectionDB, loadProductsByCategory,
    updateCategoryDB,
    updateCollectionDB
} from "../store/action";
import {staticFiles} from "../constants";
import {SelectCategories} from "./selects";

export const AdmProducts=({categoryId})=> {

    const dispatch =useDispatch();
    useEffect(()=>{
       dispatch(loadProductsByCategory(categoryId));
    },[categoryId]);

    const products=useSelector(getProductsByCategory,shallowEqual);
    const [showModal,setShowModal]=useState(false);
    const handleAdd=(name)=>{
        name&&dispatch(createCollectionDB(name));
        setShowModal(false);
    }
    return (
        <div className="adm__inner_table">
            <div className="adm__row adm__caption adm__row_products">
                <div className="adm__col adm__addnew" onClick={()=>setShowModal(true)}>+</div>
                <div className="adm__col">ID</div>
                <div className="adm__col">PRODUCT NAME</div>
                <div className="adm__col">PRICE</div>
            </div>
            {(!!products)&&(!!products.length)&&products.map(item=>
                <Item key={item.id} item={item} />
            )}
            {showModal && <Modal type="add" data={{name:""}} show={setShowModal} action={handleAdd}/>}
        </div>
    );
}

const Item=({item,collectionId})=>{
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

     return (
        <>
            <div  className="adm__row adm__row_products adm__row_data" onClick={(e)=>e.target.id!=="adm__col_focused"&&setShowModal(true)}>
                <div id="adm__col_focused" className="adm__col" >

                </div>
                <div className="adm__col adm">{item.id}</div>
                <div className="adm__col">{item.name}</div>
                <div className="adm__col">{item.price}</div>
                <div id="adm__col_focused" className="adm__col" onClick={handleDelete}>X</div>

            </div>
            {/*{showCategories&&<AdmCategories categories={item.categories} collectionId={item.id}/>}*/}
            {showModal && <Modal data={item} show={setShowModal} action={handleUpdate}/>}
        </>
    )
}

const Modal=({data,show,action,type})=>{

    const [newName,setNewName]=useState(data.name);
    const [newDesc,setNewDesc]=useState(data.description);
    const [newPrice,setNewPrice]=useState(data.price);
    const [newImage,setNewImage]=useState(staticFiles+data.image);
    const [newCategoryId,setNewCategoryId]=useState(data.category_id);
    const collections=useSelector(getCategoriesFull);

    return (
        <div id="adm__back" onClick={(e)=>e.target.id==="adm__back"&&show(false)}>
            <div className="adm__modal">
                {type==="add" ? <h3>Create new </h3> : <h3>Update: {data.name}</h3>}
                <div className="adm__modal_products">
                    <p>New name:</p>
                    <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
                    <p>New description:</p>
                    <textarea value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} rows={3}/>
                    <p>New price:</p>
                    <input value={newPrice} onChange={(e)=>setNewPrice(e.target.value)}/>
                    <p>New category:</p>
                    {/*<input value={newCategoryId} onChange={(e)=>setNewCategoryId(e.target.value)}/>*/}
                    <SelectCategories theme={"adm__modal_products"} setCategory={setNewCategoryId} />

                    <p>New base image:</p>
                    <input type="file"  onChange={(e)=>setNewImage(e.target.value)}/>
                    <img src={newImage} alt={newImage} />
                </div>
                <div className="adm__modal_buttons">
                    <div onClick={(e)=>action(newName)}>{type==="add"?"Create":"Update"}</div>
                    <div onClick={()=>show(false)}>Cancel</div>
                </div>
            </div>
        </div>
    )
}