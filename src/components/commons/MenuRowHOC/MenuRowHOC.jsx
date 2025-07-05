import React, { useEffect, useState, memo } from 'react';

import _ from 'lodash';

import MenuRow from 'components/commons/MenuRow/MenuRow';
import MenuRowList from 'components/commons/MenuRowList/MenuRowList';
import MenuListItem from 'components/commons/MenuListItem/MenuListItem';

function MenuRowHOC({ title, icon, itemsList, isOpen, showValue = false, type, returnData, selectedValue }) {
   const [ values, setValues ] = useState( selectedValue ? [{ title: selectedValue?.title, value: selectedValue.value }] : []);

   useEffect(() => {
      if ( returnData ) {
         if ( type == 'select' ) returnData({
            category: title,
            values: values?.[0]?.value,
         });
         else returnData({
            category: title,
            values: values, 
         });
      }
   }, [ values ]);

   const toggleValue = ( newValue, listType ) => {
      const newValueExists = _.some( values, obj => _.isMatch( obj, newValue ));
      if ( type == 'select' ) setValues( newValueExists ? [] : [ newValue ] );
      else if ( type == 'check' && listType == 'select' ) setValues( newValueExists ? _.filter( values, obj => !_.isMatch( obj, newValue )) : [ ..._.filter( values, obj => obj.title != newValue.title ), newValue ] );
      else  setValues( newValueExists ? _.filter( values, obj => !_.isMatch(obj, newValue )) : [ ...values, newValue ] );
   };
   
   return (
      <MenuRow title = { showValue ? ( values?.[0]?.value?.name || values?.[0]?.value || title ) : title } icon = { icon } fullView = { isOpen } >
         {
            itemsList.map( item => {
               if( item.type === 'list' ) {
                  return <MenuRowList 
                     key = { `${ title }_${ item.title }_list` } 
                     title = { item.title } 
                     itemsList = { item.list } 
                     type = { item.listType }
                     selectedValues = { values }
                     returnValue = { newValue => {
                        toggleValue({ title: item.title, value: newValue }, item.listType ) ;
                     }}
                  />
               }
               else {
                  return <MenuListItem 
                     key = {`${ item.name }_item`} 
                     name = { item.name }
                     functionality = {() => {
                        item.functionality();
                        toggleValue({ value: item.name });
                     }}
                     selected = { _.some( values, { value: item.name }) }
                     type = { item.type }
                  />
               }
            })
         }
      </MenuRow>
   )
}

export default memo( MenuRowHOC );