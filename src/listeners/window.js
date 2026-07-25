module.exports = function(bot, sellManager) {

    bot.on("windowOpen", (window) => {

        console.log("Window opened");
        console.log("Title:", window.title);
        console.log("Slots:", window.slots.length);

        sellManager.windowOpened(window);

    });

};



// module.exports = function(bot, sellManager) {

//     bot.on("windowOpen", (window) => {

//         console.log("Window opened:");
//         console.log(window.title);
//         console.log("Slots:", window.slots.length);


//         window.slots.forEach((slot, index) => {

//             if (slot) {
//                 console.log(
//                     index,
//                     slot.name,
//                     slot.count
//                 );
//             }

//         });


//         sellManager.windowOpened(window);

//     });

// };