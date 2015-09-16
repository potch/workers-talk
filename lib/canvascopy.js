

// Bicubic interpolation
"use strict";

function copyBicubic(source, width, height) {

  var dest = new ImageData(width, height);

  function getPixel(imageData, x, y) {
    var x1 = x | 0;
    var y1 = y | 0;
    var width = imageData.width;
    var height = imageData.height;
    var data = imageData.data;
    var pixel = [];
    var x0 = Math.max(x1 - 1, 0);
    var x2 = Math.min(x1 + 1, width - 1);
    var x3 = Math.min(x1 + 2, width - 1);
    var y0 = Math.max(y1 - 1, 0);
    var y2 = Math.min(y1 + 1, height - 1);
    var y3 = Math.min(y1 + 2, height - 1);
    var newVal;
    for (var offset = 0; offset < 4; offset++) {
      newVal = bicubic(x % 1, y % 1, data[(y0 * width + x0) * 4 + offset], data[(y1 * width + x0) * 4 + offset], data[(y2 * width + x0) * 4 + offset], data[(y3 * width + x0) * 4 + offset], data[(y0 * width + x1) * 4 + offset], data[(y1 * width + x1) * 4 + offset], data[(y2 * width + x1) * 4 + offset], data[(y3 * width + x1) * 4 + offset], data[(y0 * width + x2) * 4 + offset], data[(y1 * width + x2) * 4 + offset], data[(y2 * width + x2) * 4 + offset], data[(y3 * width + x2) * 4 + offset], data[(y0 * width + x3) * 4 + offset], data[(y1 * width + x3) * 4 + offset], data[(y2 * width + x3) * 4 + offset], data[(y3 * width + x3) * 4 + offset]);
      pixel.push(newVal);
    }
    return pixel;
  }

  function bicubic(x, y, p00, p01, p02, p03, p10, p11, p12, p13, p20, p21, p22, p23, p30, p31, p32, p33) {
    var x2 = x * x;
    var x3 = x2 * x;
    var y2 = y * y;
    var y3 = y2 * y;

    var a00 = p11;
    var a01 = -0.5 * p10 + 0.5 * p12;
    var a02 = p10 - 2.5 * p11 + 2 * p12 - 0.5 * p13;
    var a03 = -0.5 * p10 + 1.5 * p11 - 1.5 * p12 + 0.5 * p13;
    var a10 = -0.5 * p01 + 0.5 * p21;
    var a11 = 0.25 * p00 - 0.25 * p02 - 0.25 * p20 + 0.25 * p22;
    var a12 = -0.5 * p00 + 1.25 * p01 - p02 + 0.25 * p03 + 0.5 * p20 - 1.25 * p21 + p22 - 0.25 * p23;
    var a13 = 0.25 * p00 - 0.75 * p01 + 0.75 * p02 - 0.25 * p03 - 0.25 * p20 + 0.75 * p21 - 0.75 * p22 + 0.25 * p23;
    var a20 = p01 - 2.5 * p11 + 2 * p21 - 0.5 * p31;
    var a21 = -0.5 * p00 + 0.5 * p02 + 1.25 * p10 - 1.25 * p12 - p20 + p22 + 0.25 * p30 - 0.25 * p32;
    var a22 = p00 - 2.5 * p01 + 2 * p02 - 0.5 * p03 - 2.5 * p10 + 6.25 * p11 - 5 * p12 + 1.25 * p13 + 2 * p20 - 5 * p21 + 4 * p22 - p23 - 0.5 * p30 + 1.25 * p31 - p32 + 0.25 * p33;
    var a23 = -0.5 * p00 + 1.5 * p01 - 1.5 * p02 + 0.5 * p03 + 1.25 * p10 - 3.75 * p11 + 3.75 * p12 - 1.25 * p13 - p20 + 3 * p21 - 3 * p22 + p23 + 0.25 * p30 - 0.75 * p31 + 0.75 * p32 - 0.25 * p33;
    var a30 = -0.5 * p01 + 1.5 * p11 - 1.5 * p21 + 0.5 * p31;
    var a31 = 0.25 * p00 - 0.25 * p02 - 0.75 * p10 + 0.75 * p12 + 0.75 * p20 - 0.75 * p22 - 0.25 * p30 + 0.25 * p32;
    var a32 = -0.5 * p00 + 1.25 * p01 - p02 + 0.25 * p03 + 1.5 * p10 - 3.75 * p11 + 3 * p12 - 0.75 * p13 - 1.5 * p20 + 3.75 * p21 - 3 * p22 + 0.75 * p23 + 0.5 * p30 - 1.25 * p31 + p32 - 0.25 * p33;
    var a33 = 0.25 * p00 - 0.75 * p01 + 0.75 * p02 - 0.25 * p03 - 0.75 * p10 + 2.25 * p11 - 2.25 * p12 + 0.75 * p13 + 0.75 * p20 - 2.25 * p21 + 2.25 * p22 - 0.75 * p23 - 0.25 * p30 + 0.75 * p31 - 0.75 * p32 + 0.25 * p33;

    return a00 + a01 * y + a02 * y2 + a03 * y3 + (a10 + a11 * y + a12 * y2 + a13 * y3) * x + (a20 + a21 * y + a22 * y2 + a23 * y3) * x2 + (a30 + a31 * y + a32 * y2 + a33 * y3) * x3;
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var i = (y * width + x) * 4;
      var newPixel = getPixel(source, x * source.width / width, y * source.height / height);
      dest.data[i] = newPixel[0];
      dest.data[i + 1] = newPixel[1];
      dest.data[i + 2] = newPixel[2];
      dest.data[i + 3] = newPixel[3];
    }
  }

  return dest;
}