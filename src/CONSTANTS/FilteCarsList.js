const filterCarsList = ( filters, list ) => {
   let result = [ ...list ];
   const {
      showFavorites,
      cheaper,
      moreExpensive,
      models,
      fuel,
      gears,
      minSeats,
      maxSeats,
      minPrice,
      maxPrice,
      minBags,
      maxBags,
      locations,
   } = filters;

   result = result.filter( car => {
      if ( models.length && !models.some( model => model.id === car.model.id ) ) return false;

      if ( locations.length && !locations.some( location => location.id === car.location.id ) ) return false;

      if ( fuel.length && !fuel.includes( car.fuel ) ) return false;

      if ( gears.length && !gears.includes( car.gear )) return false;
      
      if ( minSeats && parseInt( car.seats ) < parseInt( minSeats ) ) return false;
      if ( maxSeats && parseInt( car.seats ) > parseInt( maxSeats ) ) return false;
      
      if ( minPrice && parseInt( car.price ) < parseInt( minPrice ) ) return false;
      if ( maxPrice && parseInt( car.price ) > parseInt( maxPrice ) ) return false;

      if ( minBags && parseInt( car.bags ) < parseInt( minBags ) ) return false;
      if ( maxBags && parseInt( car.bags ) > parseInt( maxBags ) ) return false;

      return true;
   })
  
   if ( showFavorites ) result = result.filter( car => car.isFavorite );

   if ( cheaper ) result.sort( ( carOne, carTwo ) => parseInt( carOne.price ) - parseInt( carTwo.price ) );
   else if ( moreExpensive ) result.sort( ( carOne, carTwo ) => parseInt( carTwo.price ) - parseInt( carOne.price ) );
   else result.sort( ( carOne, carTwo ) => new Date( carTwo.createdAt ) - new Date( carOne.createdAt ));

   return result;
}

export default filterCarsList