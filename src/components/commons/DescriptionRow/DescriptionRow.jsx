import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import styles from './DescriptionRow.module.scss';

function DescriptionRow({ title, value, style }) {
   return (
      <div className = { classNames( style, styles.row ) }>
         <span className = { styles.title }>{ title }</span>
         <span className = { styles.value }>{ value }</span>
      </div>
   )
}

export default DescriptionRow;