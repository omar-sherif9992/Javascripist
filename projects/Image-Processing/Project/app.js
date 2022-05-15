//Displays the original image after being uploaded
function displayOriginalImage(event) {
    if (event.files.length != 0) {
        if (checkFileName(event.files[0].name)) {
            document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
            document.getElementById("originalImage").style.display = "initial";
            document.getElementById("transformation").style.display = "initial";
            document.getElementById("result").style.display = "none";
        }
    }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
    if (fileName == "") {
        alert("Browse to upload a valid File with png or jpg extension");
        return false;
    } else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
        return true;
    else {
        alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
        return false;
    }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
    const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
    const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
    const increaseContrastForm = document.getElementById("increaseContrastForm");
    const decreaseContrastForm = document.getElementById("decreaseContrastForm");
    const inverseForm = document.getElementById("inverseForm");

    //Write your code here for the other forms

    const mylist = document.getElementById("myList");

    //Storing the type chosen in a variable
    transformType = mylist.options[mylist.selectedIndex].text;

    //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
    document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

    if (transformType == "Increase Brightness") {
        document.getElementById("increaseBrightnessInputs").style.display = "initial";
        document.getElementById("decreaseBrightnessInputs").style.display = "none";
        document.getElementById("increaseContrastInputs").style.display = "none";
        document.getElementById("decreaseContrastInputs").style.display = "none";


    } else if (transformType == "Decrease Brightness") {
        //write your code here
        document.getElementById("increaseBrightnessInputs").style.display = "none";
        document.getElementById("decreaseBrightnessInputs").style.display = "initial";
        document.getElementById("increaseContrastInputs").style.display = "none";
        document.getElementById("decreaseContrastInputs").style.display = "none";

    } else if (transformType == "Increase Contrast") {
        //Write your code here
        document.getElementById("increaseBrightnessInputs").style.display = "none";
        document.getElementById("decreaseBrightnessInputs").style.display = "none";
        document.getElementById("increaseContrastInputs").style.display = "initial";
        document.getElementById("decreaseContrastInputs").style.display = "none";

    } else if (transformType == "Decrease Contrast") {
        //Write your code here
        document.getElementById("increaseBrightnessInputs").style.display = "none";
        document.getElementById("decreaseBrightnessInputs").style.display = "none";
        document.getElementById("increaseContrastInputs").style.display = "none";
        document.getElementById("decreaseContrastInputs").style.display = "initial";
    } else if (transformType == "Inverse") {
        //Write your code here
        document.getElementById("increaseBrightnessInputs").style.display = "none";
        document.getElementById("decreaseBrightnessInputs").style.display = "none";
        document.getElementById("increaseContrastInputs").style.display = "none";
        document.getElementById("decreaseContrastInputs").style.display = "none";
        inverse();
    }

    // Listener to the event of submiting the increase brightness form
    increaseBrightnessForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var ib = document.getElementById("ib").value
        increaseBrightness(Number(ib));
        e.preventDefault();

    });


    //Write your code here for EventListeners for the other forms using the constants you will create in the transform function
    // Listener to the event of submiting the decrease brightness form

    decreaseBrightnessForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var db = document.getElementById("db").value;
        decreaseBrightness(Number(db));
    });

    // Listener to the event of submiting the increase Contrast form
    increaseContrastForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var ic1 = document.getElementById("ic1").value;
        var ic2 = document.getElementById("ic2").value;
        var ic3 = document.getElementById("ic3").value;
        var ic4 = document.getElementById("ic4").value;

        increaseContrast(Number(ic1), Number(ic2), Number(ic3), Number(ic4));
    });

    // Listener to the event of submiting the decrease contrast form
    decreaseContrastForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var dc1 = document.getElementById("dc1").value;
        var dc2 = document.getElementById("dc2").value;
        var dc3 = document.getElementById("dc3").value;
        var dc4 = document.getElementById("dc4").value;

        decreaseContrast(Number(dc1), Number(dc2), Number(dc3), Number(dc4));
    });
    // Listener to the event of submiting the inverse form


    //Applies pixel-wise transformations to increase brightness
    function increaseBrightness(ib) {
        const img = document.getElementById("inputImage");
        const canvas = document.getElementById("resultImage");
        const ctx = canvas.getContext('2d');

        var transformedImage = [];
        var val;

        //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
        rgba = getRGBAValues(img, canvas, ctx);


        for (i = 0; i < img.width * img.height * 4; i += 4) {
            val = rgba[i] + ib;
            if (val > 255) {
                val = 255;
            }

            transformedImage.push(val, val, val, rgba[i + 3]);
        }

        displayResultImage(img, transformedImage, ctx);

    }

    //Write your code here for three more functions for the other transformations
    // decrease brightness
    function decreaseBrightness(ib) {
        const img = document.getElementById("inputImage");
        const canvas = document.getElementById("resultImage");
        const ctx = canvas.getContext('2d');
        var transformedImage = [];
        var val;
        //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
        rgba = getRGBAValues(img, canvas, ctx);
        if (ib < 255) {
            var slope = 255 / (255 - ib);
            var yIntercept = -(slope * ib);
            console.log(rgba);
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = slope * rgba[i] + yIntercept;
                val = Math.floor(val);
                if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }

            displayResultImage(img, transformedImage, ctx);
        } else {
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = 0;
                if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }

            displayResultImage(img, transformedImage, ctx);

        }
        console.log(rgba);


    }


    function increaseContrast(ic1, ic2, ic3, ic4) {
        let condition = document.getElementById("increaseContrastConditions");
        const img = document.getElementById("inputImage");
        const canvas = document.getElementById("resultImage");
        const ctx = canvas.getContext('2d');
        //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
        rgba = getRGBAValues(img, canvas, ctx);
        var transformedImage = [];
        var val;
        var flag = false;
        condition.innerHTML = "";

        if (ic3 > ic4) {
            condition.innerHTML = "<li>Transformed Brightest Dark must be less than or equal Transformed Darkest Bright</li>" + condition.innerHTML;
            flag = true;
        }
        if (ic3 > ic1) {
            condition.innerHTML = "<li>Original Brightest Dark must be greater than or equal Transformed Brightest Dark</li>" + condition.innerHTML;
            flag = true;
        }
        if (ic2 > ic4) {
            condition.innerHTML = "<li>Transformed Darkest Bright must be greater than or equal Transformed Darkest Bright</li>" + condition.innerHTML;
            flag = true;
        }
        if (ic1 >= ic2) {
            condition.innerHTML = "<li> Original Brightest Dark must be less than Original Darkest Bright</li>" + condition.innerHTML;
            flag = true;
        }
        if (flag) {
            document.getElementById("result").style.display = "none";
            return;
        }
        condition.innerHTML = "";
        if (ic1 === 0 && ic2 === 255) {
            displayResultImage(img, rgba, ctx);
            return;
        }

        if (ic1 === 0) {
            let slope1 = ic4 / ic2; //line 1
            let slope2 = (255 - ic4) / (255 - ic2); //line 2
            let yIntercept1 = 0;
            let yIntercept2 = -slope2 * 255 + 255;
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = rgba[i];
                if (val >= 0 && val <= ic2) {
                    val = slope1 * val + yIntercept1; //line 1
                } else {
                    val = slope2 * val + yIntercept2; //line2
                }
                if (val > 255) {
                    val = 255;
                } else if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }

            displayResultImage(img, transformedImage, ctx);
            return;
        }
        if (ic2 === 255) {
            let slope1 = ic3 / ic1; //line 1
            let slope2 = (255 - ic3) / (255 - ic1); //line 2
            let yIntercept1 = 0;
            let yIntercept2 = -slope2 * 255 + 255;
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = rgba[i];
                if (val >= 0 && val <= ic1) {
                    val = slope1 * val + yIntercept1; //line 1
                } else {
                    val = slope2 * val + yIntercept2; //line2
                }
                if (val > 255) {
                    val = 255;
                } else if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }

            displayResultImage(img, transformedImage, ctx);
            return;
        }

        let slope1 = ic3 / ic1;
        let slope2 = (ic4 - ic3) / (ic2 - ic1);
        let slope3 = (255 - ic4) / (255 - ic2);
        let yIntercept1 = 0;
        let yIntercept2 = -slope2 * ic1 + ic3;
        let yIntercept3 = -slope3 * 255 + 255;
        for (i = 0; i < img.width * img.height * 4; i += 4) {
            val = rgba[i];
            if (val >= 0 && val <= ic1) {
                val = val * slope1 + yIntercept1; // line 1

            } else if (val > ic1 && val < ic2) {
                val = val * slope2 + yIntercept2; // line 2

            } else {
                val = val * slope3 + yIntercept3; // line 3
            }
            if (val > 255) {
                val = 255;
            } else if (val < 0) {
                val = 0;
            }
            transformedImage.push(val, val, val, rgba[i + 3]);
        }
        displayResultImage(img, transformedImage, ctx);
    }

    function decreaseContrast(dc1, dc2, dc3, dc4) {
        let condition = document.getElementById("decreaseContrastConditions");
        const img = document.getElementById("inputImage");
        const canvas = document.getElementById("resultImage");
        const ctx = canvas.getContext('2d');
        //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
        rgba = getRGBAValues(img, canvas, ctx);
        var transformedImage = [];
        var val;
        var flag = false;
        condition.innerHTML = "";

        if (dc3 > dc4) {
            condition.innerHTML = "<li>Transformed Brightest Dark must be less than or equal Transformed Darkest Bright</li>";
            flag = true;
        }
        if (dc1 > dc3) {
            condition.innerHTML = "<li>Original Brightest Dark must be less than or equal Transformed Brightest Dark</li>" + condition.innerHTML;
            flag = true;
        }
        if (dc2 < dc4) {
            condition.innerHTML = "<li>Transformed Darkest Bright must be less than or equal Transformed Darkest Bright</li>" + condition.innerHTML;
            flag = true;
        }
        if (dc1 >= dc2) {
            condition.innerHTML = "<li> Original Brightest Dark must be less than Original Darkest Bright</li>" + condition.innerHTML;
            flag = true;
        }
        if (flag) {
            document.getElementById("result").style.display = "none";
            return;
        }

        if (dc1 === 0 && dc2 === 255) {
            displayResultImage(img, rgba, ctx);
            return;
        }
        condition.innerHTML = "";

        if (dc1 === 0) {
            let slope1 = (dc4 - dc3) / (dc2); //line 1
            let slope2 = (255 - dc4) / (255 - dc2); //line 2
            let yIntercept1 = dc3;
            let yIntercept2 = -slope2 * 255 + 255;
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = rgba[i];
                if (val >= 0 && val <= dc2) {
                    val = slope1 * val + yIntercept1; //line 1
                } else {
                    val = slope2 * val + yIntercept2; //line2
                }

                if (val > 255) {
                    val = 255;
                } else if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }
            displayResultImage(img, transformedImage, ctx);
            return;
        }
        if (dc2 === 255) {
            let slope1 = dc3 / dc1; //line 1
            let slope2 = (dc4 - dc3) / (255 - dc1); //line 2
            let yIntercept1 = 0;
            let yIntercept2 = -slope2 * 255 + dc4;
            for (i = 0; i < img.width * img.height * 4; i += 4) {
                val = rgba[i];
                if (val >= 0 && val <= dc1) {
                    val = slope1 * val + yIntercept1; //line 1
                } else {
                    val = slope2 * val + yIntercept2; //line2
                }

                if (val > 255) {
                    val = 255;
                } else if (val < 0) {
                    val = 0;
                }
                transformedImage.push(val, val, val, rgba[i + 3]);
            }

            displayResultImage(img, transformedImage, ctx);
            return;
        }

        let slope1 = dc3 / dc1;
        let slope2 = (dc4 - dc3) / (dc2 - dc1);
        let slope3 = (255 - dc4) / (255 - dc2);
        let yIntercept1 = 0;
        let yIntercept2 = -slope2 * dc1 + dc3;
        let yIntercept3 = -slope3 * 255 + 255;
        for (i = 0; i < img.width * img.height * 4; i += 4) {
            val = rgba[i];
            if (val >= 0 && val <= dc1) {
                val = val * slope1 + yIntercept1; // line 1

            } else if (val > dc1 && val < dc2) {
                val = val * slope2 + yIntercept2; // line 2

            } else {
                val = val * slope3 + yIntercept3; // line 3
            }

            if (val > 255) {
                val = 255;
            } else if (val < 0) {
                val = 0;
            }
            transformedImage.push(val, val, val, rgba[i + 3]);
        }
        displayResultImage(img, transformedImage, ctx);

    }

    function inverse() {
        const img = document.getElementById("inputImage");
        const canvas = document.getElementById("resultImage");
        const ctx = canvas.getContext('2d');

        var transformedImage = [];
        var val;

        //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
        rgba = getRGBAValues(img, canvas, ctx);
        //  document.getElementById("temp").value = rgba;


        for (i = 0; i < img.width * img.height * 4; i += 4) {
            val = Math.abs(rgba[i] - 255);
            if (val > 255) {
                val = 255;
            } else if (val < 0) {
                val = 0;
            }
            transformedImage.push(val, val, val, rgba[i + 3]);
        }

        displayResultImage(img, transformedImage, ctx);
    }

    //Extracts rgba 1D array of all the pixels in the original image
    function getRGBAValues(img, canvas, ctx) {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        var rgba = ctx.getImageData(
            0, 0, img.width, img.height
        ).data;
        return rgba;
    }

    //Displays the transformed image
    function displayResultImage(img, transformedImage, ctx) {
        //Get a pointer to the current location in the image.
        var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
        //Wrap your array as a Uint8ClampedArray
        palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
        //Repost the data.
        ctx.putImageData(palette, 0, 0);
        document.getElementById("result").style.display = "initial";
    }
}