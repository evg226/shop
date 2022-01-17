import React, {useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { getProductsByCategory } from "../store/selectors";
import {
    createProductDB,
    deleteCategoryDB,
    deleteCollectionDB, deleteProductDB, loadProductsByCategory,
    updateProductDB
} from "../store/action";
import {staticFiles} from "../constants";
import {SelectCategories} from "./selects";
import {ModalImages} from "./images";

export const AdmProducts=({categoryId})=> {

    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(loadProductsByCategory(categoryId));
    },[categoryId]);

    const products=useSelector(getProductsByCategory,shallowEqual);
    const [showModal,setShowModal]=useState(false);
    const handleAdd=(product)=>{
        product && dispatch(createProductDB(product));
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
            {showModal && <Modal type="add"
                                 data={{name:"", description:"", price:"", image:"", category_id:categoryId}}
                                 show={setShowModal}
                                 action={handleAdd}/>}
        </div>
    );
}

const Item=({item,collectionId})=>{
    const dispatch=useDispatch();

    const [showModal,setShowModal]=useState(false);
    const [showImagesModal,setShowImagesModal]=useState(false);

    const handleDelete=()=>{
        if(window.confirm(`Do you what to delete ${item.name} from database?`)){
            dispatch(deleteProductDB(item.id));
        };
    }
    const handleUpdate=(product)=>{
        dispatch(updateProductDB(product));
        setShowModal(false);
    }
    const handleClickImages=()=>{
        setShowImagesModal(!showImagesModal);
    }

    return (
        <>
            <div  className="adm__row adm__row_products adm__row_data"
                  onClick={(e)=>e.target.id!=="adm__col_focused"&&setShowModal(true)}>
                <div id="adm__col_focused" className="adm__col"
                    onClick={handleClickImages}>...</div>
                <div className="adm__col adm">{item.id}</div>
                <div className="adm__col">{item.name}</div>
                <div className="adm__col">{item.price}</div>

                <div id="adm__col_focused" className="adm__col" onClick={handleDelete}>X</div>

            </div>
            {showModal && <Modal data={item} show={setShowModal} action={handleUpdate}/>}
            {showImagesModal && <ModalImages data={item} show={setShowImagesModal} />}
        </>
    )
}

const Modal=({data,show,action,type})=>{

    const [newName,setNewName]=useState(data.name);
    const [newDesc,setNewDesc]=useState(data.description);
    const [newPrice,setNewPrice]=useState(data.price);
    const [newImage,setNewImage]=useState(data.image);
    const [mainImage,setMainImage]=useState("");
    const [newCategoryId,setNewCategoryId]=useState(data.category_id);
    const handleSend=()=>{
        const product={
            id:data.id,
            name:newName,
            description:newDesc,
            price:newPrice,
            image:newImage,
            categoryId:newCategoryId,
            mainImage
        }
        action(product);

    }

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
                    <SelectCategories theme={"adm__modal_products"} value1={newCategoryId} setCategory={setNewCategoryId} />

                    <p>New base image:</p>
                    <input type="file" onChange={(e)=>setMainImage(e.target.files[0])} />
                    <img src={staticFiles+newImage} alt={newImage} />
                </div>
                <div className="adm__modal_buttons">
                    <div onClick={handleSend}>{type==="add"?"Create":"Update"}</div>
                    <div onClick={()=>show(false)}>Cancel</div>
                </div>
            </div>
        </div>
    )
}