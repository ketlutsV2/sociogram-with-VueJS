﻿/**
 * Jdenticon
 * https://github.com/dmester/jdenticon
 * Copyright © Daniel Mester Pirttijärvi
 */

export const ICON_TYPE_SVG = 1;

export const ICON_TYPE_CANVAS = 2;

export const ATTRIBUTES = {
    HASH: "data-jdenticon-hash",
    VALUE: "data-jdenticon-value"
};

export const ICON_SELECTOR = "[" + ATTRIBUTES.HASH +"],[" + ATTRIBUTES.VALUE +"]";

export const documentQuerySelectorAll = /** @type {!Function} */ (
    typeof document !== "undefined" && document.querySelectorAll.bind(document));

export function getIdenticonType(el) {
    if (el) {
        const tagName = el["tagName"];

        if (/^svg$/i.test(tagName)) {
            return ICON_TYPE_SVG;
        }

        if (/^canvas$/i.test(tagName) && "getContext" in el) {
            return ICON_TYPE_CANVAS;
        }
    }
}
