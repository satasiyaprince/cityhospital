import React from 'react'

function Loading(Component) {
    return function WLC({ loading }) {
        if (loading) {
            return (
                <div>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <style dangerouslySetInnerHTML={{ __html: "\n        /* .navbar {\n            overflow: hidden;\n            background-color: #333;\n        } */\n\n        /* .navbar a {\n            float: left;\n            font-size: 16px;\n            color: white;\n            text-align: center;\n            padding: 14px 16px;\n            text-decoration: none;\n        } */\n\n        /* .dropdown {\n            float: left;\n        } */\n/* \n        .dropdown .dropbtn {\n            cursor: pointer;\n            font-size: 16px;\n            border: none;\n            color: white;\n            padding: 14px 16px;\n            background-color: #333;\n            font-family: inherit;\n            margin: 0;\n        } */\n\n        /* .navbar a:hover,\n        .dropdown:hover .dropbtn,\n        .dropbtn:focus {\n            background-color: red;\n        } */\n\n        /* .dropdown-content {\n            display: none;\n            position: absolute;\n            background-color: #f9f9f9;\n            min-width: 160px;\n        } */\n/* \n        .dropdown-content a {\n            float: none;\n            color: black;\n            padding: 12px 16px;\n            text-decoration: none;\n            display: block;\n            text-align: left;\n        } */\n/* \n        .dropdown-content a:hover {\n            background-color: #ddd;\n        } */\n\n        .show {\n            display: block;\n        }\n\n        .header-fixed {\n            position: sticky;\n            top: 0\n        }\n\n        .loader {\n            border: 16px solid #f3f3f3;\n            /* Light grey */\n            border-top: 16px solid #3498db;\n            /* Blue */\n            border-radius: 50%;\n            width: 60px;\n            height: 60px;\n            animation: spin 2s linear infinite;\n            margin: 0 auto;\n        }\n\n        @keyframes spin {\n            0% {\n                transform: rotate(0deg);\n            }\n\n            100% {\n                transform: rotate(360deg);\n            }\n        }\n    " }} />
                    <div className="loader" id="loader" />
                    <h1 id="mainContent">
                    </h1>
                </div>


            )
        } else {
            return (
                <Component />
            )
        }
    }
}

export default Loading;