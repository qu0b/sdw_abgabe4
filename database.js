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

function writeContact(userId, addressId) {
  firebase.database().ref('contact/' + userId).set({
    user: userId,
    address: addressId
  });
}

function writeProduct(productId, name, price) {
  firebase.database().ref('product/' + productId).set({
    user: userId,
    address: addressId
  });
}

function writeOrder(orderId, userId, addressId, qunatity, price) {
  firebase.database().ref('order/' + orderId).set({
    user: userId,
    addressId:quantity,
    price:price
  });
}

function writeProduct(orderId, userId, qunatity, price) {
  firebase.database().ref('product/' + productId).set({
    user: userId,
    address: addressId
  });
}
