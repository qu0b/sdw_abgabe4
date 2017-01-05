var database = firebase.database();


function writeUserData(userId, name, email, role) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    role: role
  });
}

function writeAddress(addressId, street, postalcode, city, county, country) {
  firebase.database().ref('address/' + addressId).set({
    street: street,
    code: postalcode,
    city: city,
    county: county,
    country: country
  });
}

function writeContact(Id, addressId) {
  firebase.database().ref('contact/' + userId).set({
    address: addressId
  });
}

function writeProduct(productId, name, price, locationId) {
  firebase.database().ref('product/' + productId).set({
    name: name,
    price: price,
    locationId: locationId
  });
}

function writeOrder(orderId, userId, addressId, qunatity, price) {
  firebase.database().ref('order/' + orderId).set({
    user: userId,
    addressId:addressId,
    quantity:quantity,
    price:price
  });
}

function writeWharehouse(wharehouseId, locationId) {
  firebase.database().ref('product/' + productId).set({
    locationId: locationId,
  });
}
