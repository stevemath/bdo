
var lock;
var DSUsers;

var client, // Connection to the Azure Mobile App backend
    store,  // Sqlite store to use for offline data sync
    syncContext, // Offline data sync context
    // tableName = 'transactions',
    tableName = 'transactions',
    transTable; // Reference to a table endpoint on backend
var bdobudgetClient;

$('document').ready(function () {
  var content = $('.content');
  content.css('display', 'block');
 

    $("#cmsTabs").kendoTabStrip({});


  // buttons and event listeners
  var loginBtn = $('#btn-login');
  var logoutBtn = $('#btn-logout');

  loginBtn.click(login);
  logoutBtn.click(logout);

  function login() {
      client = new WindowsAzure.MobileServiceClient('https://bdo2.azurewebsites.net');

      //client.login('aad')
      client.login('google')
          .then(function () {

              var st = new Date().getTime();
              console.log(st)
              var transTbl = client.getTable(tableName);
              console.log(transTbl)
              transTbl
                  // .where({ userId: 123 })
                  .read()
                  .then(function (data) {

                      console.log(data);
                      var ed = new Date().getTime();
                      console.log(ed)
                  }, function (err) { console.log(err) });

              //.where({ userId: 123 })     // Set up the query
              // Read the results
              // 

          });
  }

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);


        console.log(authResult.accessToken);
        console.log(authResult.idToken);

        console.log(authResult.idTokenPayload.sub);

        var uid = authResult.idTokenPayload.sub;
        var email = authResult.idTokenPayload.name;






        //client.currentUser.mobileServiceAuthenticationToken
        //bdo.database.windows.net

        // "b312f449-db32-4b22-add6-915bcaca2965"

        //$.ajax({
        //    url: "https://bdoauth.azurewebsites.net/api/HttpTriggerJS1?code=gTLGarZBaQ9Rn1taYa9cHFDlXDdg7gNI2CoukDiuRBq4lanwh3fQdQ==&name=evets",
        //    method: "GET",
        //    credentials: 'include',
        //    cache: 'no-cache',
        //    mode: 'cors',
        //    success: function (data) {
        //        console.log(data)
        //    },
        //    error: function (err) { console.log("error") },

        //})

        var udata = {};
        udata.userId = uid;
        udata.email = email;


        //$.ajax({
        //    url: "https://bdobudget.azurewebsites.net/tables/users?zumo-api-version=2.0.0",
        //    type: "GET",
        //    data: JSON.stringify(udata),
        //    success: function (data) {



        //    },
        //    error: function (err) { console.log("error") },
        //    beforeSend: function (xhr) {
        //        xhr.setRequestHeader("Authorization", "Bearer " + authResult.idToken);
        //        xhr.setRequestHeader("Content-Type", "application/json");
        //    },
        //});

        DSUsers =    getTblDataSource("users", authResult.idToken);



       


        //var client = new WindowsAzure.MobileServiceClient('https://bdobudget.azurewebsites.net');
        //var table = client.getTable("users");
        ////table
        //    .del({ id: '8b56b1a3-40c7-40fb-a70a-79cd328d6e83' })
        //    .done(function () {
        //        // Record is now deleted - update your cache
        //    }, failure);
        //var t = { "access_token": authResult.idToken }
        //client.login("", t).done(function (results) {
        //    var userId = results.userId;
        //    console.log(results)
        //});



        //    $.ajax({
        //        url: "https://bdobudget.azurewebsites.net/tables/users/62d41757-aac2-4f8e-a6bb-f40632393c43?zumo-api-version=2.0.0",          
        //        method: "DELETE",
        //       // data:delData,
        //        success: function (data) {

        //          console.log(data)

        //        },
        //        error: function (err) { console.log(err) },
        //        beforeSend: function (xhr) {
        //            xhr.setRequestHeader("Authorization", "Bearer " + authResult.idToken);

        //        },
        //    })
        //}




        // console.log(data);


        //var tableName = 'transactions';
        //var transTbl = client.getTable(tableName);
        //console.log(transTbl)


        //transTbl
        //    // .where({ userId: 123 })
        //    .read()
        //    .then(function (data) {

        //        console.log(data);

        // });


    }



  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function displayButtons() {
    var loginStatus = $('.container h4');
    if (isAuthenticated()) {
      loginBtn.css('display', 'none');
      logoutBtn.css('display', 'inline-block');
      loginStatus.text('You are logged in!');
    } else {
      loginBtn.css('display', 'inline-block');
      logoutBtn.css('display', 'none');
      loginStatus.text('You are not logged in! Please log in to continue.');
    }
  }

  displayButtons();
});

var config = {
    databaseURL: "https://bdobudget.azurewebsites.net/tables/",
    suffix: "?zumo-api-version=2.0.0",



}


const account = {
    name: "bdoauth8fdb",
   // name:"dgpo7itjj6n3yazfunctions",
   // sas: "?sv=2017-07-29&ss=bfqt&srt=sco&sp=rwdlacup&se=2018-04-21T22:56:20Z&st=2018-04-18T14:56:20Z&spr=https,http&sig=NS%2Bj9Xev22DhVAjg%2BCzYAUARAOKghqTmhAUJ2F71qU8%3D"
};


// "https://sastokens.azurewebsites.net/api/GetSasToken-Node?code=jhpPaK9UBDOOJmOPDDwa6kvaw3X05YObhCOi8qJfJV95N8mhVlPwVA=="
// https://bdoauth8fdb.blob.core.windows.net/testcontainer/bumblebee.jpg
// container blobName
var uData = { container: "testcontainer" }
var  blobUri = 'https://' + account.name + '.blob.core.windows.net';
var blobService;// = AzureStorage.Blob.createBlobServiceWithSas(blobUri, account.sas);



$.ajax({
    method: "POST",
    url: "https://sastokens.azurewebsites.net/api/GetSasToken-Node?container=testcontainer&permissions=racwdl&code=jhpPaK9UBDOOJmOPDDwa6kvaw3X05YObhCOi8qJfJV95N8mhVlPwVA==",
    data: JSON.stringify(uData),
    success: function (data) {
        console.log(data);
        blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, "?" + data.token);

        blobService.listBlobsSegmented('testcontainer', null, (error, results) => {
            if (error) {
                // Handle list blobs error
            } else {
                results.entries.forEach(blob => {
                    console.log(blob);
                });
            }
        });
    },


})




//document.getElementById('create-button').addEventListener('click', () => {

//    blobService.createContainerIfNotExists('testcontainer', (error, container) => {
//        if (error) {
//            // Handle create container error
//        } else {
//            console.log(container.name);
//        }
//    });

//});


//document.getElementById('upload-button').addEventListener('click', () => {

//    const file = document.getElementById('fileinput').files[0];
//    console.log(file);
//    blobService.createBlockBlobFromBrowserFile('testcontainer',
//        file.name,
//        file,
//        (error, result) => {
//            if (error) {
//                // Handle blob error
//            } else {
//                console.log('Upload is successful');
//            }
//        });

//});



//document.getElementById('list-button').addEventListener('click', () => {

//    blobService.listBlobsSegmented('testcontainer', null, (error, results) => {
//        if (error) {
//            // Handle list blobs error
//        } else {
//            results.entries.forEach(blob => {
//                console.log(blob);
//            });
//        }
//    });

//});


//document.getElementById('delete-button').addEventListener('click', () => {

//    var blobName = "bumblebee.jpg";
//    blobService.deleteBlobIfExists('testcontainer', blobName, (error, result) => {
//        if (error) {
//            // Handle delete blob error
//        } else {
//            console.log('Blob deleted successfully');
//        }
//    });

//});

function getTblDataSource(tbl, authToken) {
    console.log("get ds");

    var dataSource = new kendo.data.DataSource({
        // autoSync: true, // recommended
        schema: {
            
            model: {
                id: 'id',
                fields: {
                    id: { type: "string" },
                    userId: { type: "string" },
                    // key: { type: "string" },
                    // contentlevel: { type: "number" },
                    //foodid: { type: "number" },
                    //nutrientid: { type: "number" },
                }
            }
        },
        transport: {

            read: {
                //parse: function () {


                //},
                url: function (options) {
                    // console.log(options)
                    return config.databaseURL + tbl + config.suffix + "&id=" + options.id
                },
                dataType: "json",
                contentType: "application/json",
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', "Bearer " + authToken);
                },

            },
            update: {
                url: function (options) {
                   
                    return config.databaseURL +  tbl +  config.suffix + "&id=" + options.id 
                },
                dataType: "json",
                type: "PATCH",
                contentType: "application/json",
                success: function (options) { console.log(options) },
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', "Bearer " + authToken);
                },


            },
            destroy: {
                url: function (options) {
                    console.log(options)
                    return config.databaseURL + tbl + "/" +  options.id  + config.suffix 
                },
                dataType: "json",
                type: "DELETE",
                contentType: "application/json",
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', authToken);
                },
            },
            create: {
                url: function (options) {
                    console.log(options)
                    return config.databaseURL +  tbl + config.suffix 
                },
                dataType: "json",
                type: "POST",
                contentType: "application/json",
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', authToken);
                },
            },
            parameterMap: function (data) {

                console.log(JSON.stringify(data));
                var finalData = { id: data.id, userId: data.userId, email: data.email };
                return JSON.stringify(finalData);
            }
        },
        requestEnd: function (e) {
            var response = e.response;
            var type = e.type;
            console.log(response);
          
        },
        requestStart: function (e) {
            console.log(e);
        },
        pageSize: 12,

    });

    dataSource.fetch(function () {
        console.log("ds fetched");
        console.log(this.data());
        
        setupGridUsers();
    });

    return dataSource;
}


function setupGridUsers() {

    $("#usersGrid").kendoGrid({

        autoSync: true,
        dataSource: DSUsers,
        editable: "popup",
        pageable: true,

        toolbar: ["create"],
        columns: [
            { field: "id", title: "Id" },
            { field: "userId", title: "User Id" },
            { field: "email", title: "Email" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],


    });


}