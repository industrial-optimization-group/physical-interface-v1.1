# desdeo-frontend for Modular Physical User Interface

# About
The modular physical user interface can be used for various interactive multiobjective
optimization methods available in [DESDEO](https://desdeo.it.jyu.fi/). 
`desdeo-frontend` provides the graphical user interface (GUI) for such optimization methods.
`desdeo-frontend` is related to the ecosystem of packages
belonging to DESDEO. The GUI can be used to define, explore, and solve multiobjective optimization
problems of varying type interactively. `desdeo-frontend` has been developed as a [React](https://reactjs.org/) application
in [TypeScript](https://www.typescriptlang.org/). `desdeo-frontend` is also an example on how the
interactive visualizations implemented in [desdeo-components](https://github.com/gialmisi/desdeo-components)
may be used, and how the [desdeo-webapi](https://github.com/gialmisi/desdeo-webapi)
API can be utilized in practice.

# Installation and usage

## Installation

Before installing `desdeo-frontend`, make sure a server with
[desdeo-webapi](https://github.com/gialmisi/desdeo-webapi) is first
installed and running, either locally or on some remote machine. To run it locally, follow the instructions
on [desdeo-webapi](https://github.com/gialmisi/desdeo-webapi)'s GitHub page.

From here on, it is assumed that a server is run locally with the address `http://127.0.0.1:5000`.

To install ``desdeo-frontend``, make sure your system supports a [Node.js](https://nodejs.org/en/) environment and a
dependency manager, such as [npm](https://docs.npmjs.com/cli/v7/commands/npm) or [yarn](https://yarnpkg.com/) is available.
`yarn` is recommended as it has been tested to be working. From here on, it is assumed that `yarn` is available.

When `Node.js` is installed and a package manager is available, `desdeo-frontend` can be installed by running the
following commans:

```
$> git clone git@github.com:gialmisi/desdeo-frontend.git
$> cd desdeo-frontend
$> yarn install 
```

To run the GUI application, first, make sure that the variable `API_URL` in `src/App.tsx` is set with a valid URL
(e.g., `http://127.0.0.1:5000`). Then, run the `start` script by issuing the command:

```
$> yarn run start
```

This should launch the GUI application in a new tab in your web browser.

### Web USB on Chrome

The physical user interface utilizes the WebUSB API and works on Chrome. Please note that Firefox is not supported yet for our device. The USB device (Arduino) should be authourized to send commands to the browser. For authourization in setup in linux refer to:
https://support.microbit.org/support/solutions/articles/19000105428-webusb-troubleshooting

Create a file in /etc/udev/rules.d named arduino.rules and add the following line:
```
SUBSYSTEM=="usb", ATTR{idVendor}=="2341", ATTR{idProduct}=="8036", MODE="0664", GROUP="plugdev"
```
The rule file can be found in the chrome_rules folder.

## Usage

### Harware Setup
First the modules should be arranged as per the decision maker's choice. After the arrangement in complete, simply connect any of the modules USB port to the computer via a USB2.0 cable (micro B type). All the LED indicators on the modules should glow red denoting all are powered up. In case the USB port is unable to supply required current, connect the 5V power supply to the power port availble on the modules.

### Frontend Usage

To use the GUI, a username and password are required. For locally running the GUI, a dummy user(s) with a password(s) can be set readily by utilzing the utilities provided in [desdeo-webapi](git@github.com:gialmisi/desdeo-frontend.git).
After logging in, the navigation bar will update with menus to access various features of the GUI.

![login](./resources/login.gif)


# Features

## Supported problem types

Currently, only a dummy problem can be defined through the interface. However, the intractive methods support
solving problems with both analytical formualtions and/or discrete formulations. Problems must currently be added
manually to the databse in `desdeo-webapi`. See its documentation for additiona details. 

## Supported interactive methods
Currently interfaces for the following multiobjective optimization methods have been implemented:

### IRVEA : Interactive RVEA

Interactive RVEA is based on the following work. Kindly refer to the paper for more details about the algorithm.

You can solve the provided river pollution problem as of now.

### Automatic arrangement detection

After the modules has been connected to the computer a popup will appear showing new harware has been detected. In the visualization, press the connect button and choose the connected device and press the connect button. Next, press the Start button to begin the arrangement detection pocess. The detected arrangement of the modules will be displayed denoting the real world arrangement. Assign the fields on the modules to respective objective functions and buttons for starting iteration, stop, etc. The optimization process can now be started using the physical user interface.

# Known Issues to be Resolved

* The visualization for the arrangment breaks when the number of modules is too high. Auto zooming should resolve this problem. 
* The values of the reference point is set by activating the Set button repeatedly.
* If modules are rearranged, it is not always detected and the visulization has to restarted from the login page.
* Graphics of the modules could be improved. 

# Future Works


# Contributors

Below are listed the major contributors to `desdeo-frontend`. If you feel you should be part of this list, make a PR.
- [Giovanni Misitano](https://github.com/gialmisi) - **maintainer**
- [Juuso Pajasmaa](https://github.com/jpajasmaa)
- [Stefan]
- [Atanu]