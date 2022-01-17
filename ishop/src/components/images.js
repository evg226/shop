import React, {useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getImages, getProductsByCategory} from "../store/selectors";
import {    createImagesDB,loadImagesDB,deleteImagesDB} from "../store/action";
import {staticFiles} from "../constants";

export const ModalImages=({data,show,action,type})=>{

    const [selectedImage,setSelectedImage]=useState({});
    const [addedImage,setAddedImage]=useState("");
    const dispatch =useDispatch();
    const refFile=useRef();
    useEffect(()=>{
        dispatch(loadImagesDB(data.id));
    },[data.id]);

    const images=useSelector(getImages,shallowEqual);
    const handleAdd=()=>{
         dispatch(createImagesDB(data.id,addedImage));
         setAddedImage("");
         refFile.current.value="";
    }

    const handleDelete=()=>{
        dispatch(deleteImagesDB(selectedImage.id));
    }

    const handleChangeAddedInput=(e)=>{
        setAddedImage(e.target.files[0]?e.target.files[0]:"");
    }
    return (
        <div id="adm__back" onClick={(e)=>e.target.id==="adm__back"&&show(false)}>
            <div className="adm__modal adm__modal_images">
                <h3>Images</h3>
                <div className="adm__container_images">
                    <div className="adm__image adm__image_add" onClick={()=>setSelectedImage({})}>
                        <span>{addedImage.name||"CHOOSE NEW"}</span>
                        <input type="file" ref={refFile} onChange={handleChangeAddedInput} />
                    </div>
                    {!!images&&!!images.length&&images.map(imageItem=>
                        <div key={imageItem.id} className={imageItem.id===selectedImage.id?"adm__image adm__image_selected":"adm__image"}
                             onClick={()=>setSelectedImage(imageItem)}>
                            <img src={staticFiles+imageItem.path} />
                        </div>
                    )}
                </div>
                <div className="adm__modal_buttons">
                    {!!addedImage.name&&<div onClick={handleAdd}>ADD</div>}
                    {selectedImage.id&&<div onClick={handleDelete}>Delete</div>}
                    <div onClick={()=>show(false)}>Close</div>
                </div>
            </div>
        </div>
    )
}
