import React, { 
   useEffect,
   useState,
} from 'react';

import _ from 'lodash';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faImages,
   faCircleXmark,
   faCloudArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import Button from 'components/commons/Button/Button';

import styles from './DropZone.module.scss';
 
function DropZone({ returnImages, selectedImages }) {
   const [ droppedImages, setDroppedImages ] = useState( selectedImages || [] );
   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

   const imageTypeRegExp = /^image\//;
   
   useEffect( () => {
      if( !droppedImages.length ) {
         returnImages({
            category: 'Images',
            values: undefined,
         });
      } else returnImages({
         category: 'Images',
         values: droppedImages.map( item => ( item?.image || { id: item.id } ) ),
      });
   }, [ droppedImages ])


   const onDrop = acceptedFiles => {
      const newImages = acceptedFiles.map( image => {
         if( !_.some( droppedImages, { name: image.name } ) && imageTypeRegExp.test( image.type ) ) {
            return {
               preview: URL.createObjectURL( image ),
               image: image,
               name: image.name,
            };
         }
      }).filter( Boolean );
      setDroppedImages([ ...droppedImages, ...newImages ]);
   }
   
   const deletImage = ( name ) => setDroppedImages( droppedImages.filter( image => image.name !== name ) );
   return (
      <div 
         { ...getRootProps() }
         className = { styles.dropZone }
      >
         <input { ...getInputProps() }/>
         {
            droppedImages.length == 0
               ?
                  <>
                     <FontAwesomeIcon icon = { isDragActive ? faCloudArrowDown : faImages } className = { styles.icon }/>
                     <Button name = "Upload" style = { styles.selectBtn }/>
                     <p>OR DROP FILES HERE</p>
                  </>
               :
                  <div className = { styles.gallery }>
                     {
                        droppedImages.map( photo => {
                           return (
                              <div 
                                 className = { styles.galleryItem }
                                 key = { photo.name }
                              >
                                 <FontAwesomeIcon 
                                    className = { styles.removeBtn } 
                                    icon = { faCircleXmark } 
                                    onClick = { event => {
                                       event.stopPropagation();
                                       deletImage( photo.name );
                                    }} 
                                 />
                                 <img 
                                    className = { styles.galleryItemPhoto }
                                    src = { photo.preview } 
                                    alt = { photo.name }
                                 />
                              </div>
                           )
                        }
                        )
                     }
                  </div>
         }
         
         
      </div>
   )
}

export default DropZone;