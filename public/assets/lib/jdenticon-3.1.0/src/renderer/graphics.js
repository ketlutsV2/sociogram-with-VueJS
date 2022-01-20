﻿/**
 * Jdenticon
 * https://github.com/dmester/jdenticon
 * Copyright © Daniel Mester Pirttijärvi
 */

import { NO_TRANSFORM } from "./transform";

/**
 * @typedef {import("./renderer").Renderer} Renderer
 * @typedef {import("./transform").Transform} Transform
 */

/**
 * Provides helper functions for rendering common basic shapes.
 */
export class Graphics {
    /**
     * @param {Renderer} renderer 
     */
    constructor(renderer) {
        /**
         * @type {Renderer}
         * @private
         */
        this._renderer = renderer;

        /**
         * @type {Transform}
         */
        this.currentTransform = NO_TRANSFORM;
    }

    /**
     * Adds a polygon to the underlying renderer.
     * @param {Array<number>} points The points of the polygon clockwise on the format [ x0, y0, x1, y1, ..., xn, yn ]
     * @param {boolean=} invert Specifies if the polygon will be inverted.
     */
    addPolygon(points, invert) {
        const di = invert ? -2 : 2,
              transformedPoints = [];
        
        for (let i = invert ? points.length - 2 : 0; i < points.length && i >= 0; i += di) {
            transformedPoints.push(this.currentTransform.transformIconPoint(points[i], points[i + 1]));
        }
        
        this._renderer.addPolygon(transformedPoints);
    }
    
    /**
     * Adds a polygon to the underlying renderer.
     * Source: http://stackoverflow.com/a/2173084
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the entire ellipse.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the entire ellipse.
     * @param {number} size The size of the ellipse.
     * @param {boolean=} invert Specifies if the ellipse will be inverted.
     */
    addCircle(x, y, size, invert) {
        const p = this.currentTransform.transformIconPoint(x, y, size, size);
        this._renderer.addCircle(p, size, invert);
    }

    /**
     * Adds a rectangle to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle.
     * @param {number} w The width of the rectangle.
     * @param {number} h The height of the rectangle.
     * @param {boolean=} invert Specifies if the rectangle will be inverted.
     */
    addRectangle(x, y, w, h, invert) {
        this.addPolygon([
            x, y, 
            x + w, y,
            x + w, y + h,
            x, y + h
        ], invert);
    }

    /**
     * Adds a right triangle to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the triangle.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the triangle.
     * @param {number} w The width of the triangle.
     * @param {number} h The height of the triangle.
     * @param {number} r The rotation of the triangle (clockwise). 0 = right corner of the triangle in the lower left corner of the bounding rectangle.
     * @param {boolean=} invert Specifies if the triangle will be inverted.
     */
    addTriangle(x, y, w, h, r, invert) {
        const points = [
            x + w, y, 
            x + w, y + h, 
            x, y + h,
            x, y
        ];
        points.splice(((r || 0) % 4) * 2, 2);
        this.addPolygon(points, invert);
    }

    /**
     * Adds a rhombus to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the rhombus.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the rhombus.
     * @param {number} w The width of the rhombus.
     * @param {number} h The height of the rhombus.
     * @param {boolean=} invert Specifies if the rhombus will be inverted.
     */
    addRhombus(x, y, w, h, invert) {
        this.addPolygon([
            x + w / 2, y,
            x + w, y + h / 2,
            x + w / 2, y + h,
            x, y + h / 2
        ], invert);
    }
}