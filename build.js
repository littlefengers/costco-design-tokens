const StyleDictionary = require("style-dictionary")
const { paramCase } = require("param-case")

console.log("Build started...")
console.log("\n==============================================")

// REGISTER THE CUSTOM TRANFORMS
//TODO Refactor so it's more flexible
//Or remove transforms altogether
StyleDictionary.registerTransform({
  name: "web/px", // notice: the name is an override of an existing predefined method (yes, you can do it)
  type: "value",
  matcher: function (prop) {
    // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
    return prop.path[0] === "bp"
  },
  transformer: function (prop) {
    //Will need to write a custom transform that splits
    return `${prop.value}px`
  },
})

StyleDictionary.registerTransform({
  name: "name/cti/kebabCustom",
  type: "name",
  transformer: function (prop, options) {
    return paramCase([options.prefix].concat(prop.path).join(" "))
  },
})

//Slightly different than what's in 3.0 because we don't need the rem, but want the calculation
//TODO Can't decide yet if we should do transforms in style dictionary or Forge
StyleDictionary.registerTransform({
  name: "size/pxToRem", //
  type: "value",
  matcher: function (prop) {
    // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
    return (prop.path[0] === "bp" || prop.path[1] === "container")
  },
  transformer: function (prop) {
    //Will need to write a custom transform that splits
    const floatVal = parseFloat(prop.value)

    if (isNaN(floatVal)) {
      throwSizeError(prop.name, prop.value, "rem")
    }

    if (floatVal === 0) {
      return "0"
    }

    return `${floatVal / 16}`
  },
})

// StyleDictionary.registerTransform({
//   name: 'ratio/%',
//   type: 'value',
//   matcher: function(prop) {
//       // here we are using a custom attribute, declared in the property, to match the values where apply the transform
//       return prop.group === 'ratio';
//   },
//   transformer: function(prop) {
//       return `${Math.floor(100 * prop.value)}%`;
//   }
// });

// StyleDictionary.registerTransform({
//   name: 'hexRGB/hexARGB',
//   type: 'value',
//   matcher: function(prop) {
//       return prop.group === 'color';
//   },
//   transformer: function(prop) {
//       // for sake of simplicity, in this example we assume colors are always in the format #xxxxxx
//       return prop.value.replace(/^#/,'#FF');
//   }
// });

// StyleDictionary.registerTransform({
//   name: 'custom/spacing',
//   type: 'value',
//   matcher: function(prop) {
//       return prop.group === 'spacing';
//   },
//   transformer: function(prop) {
//       // in Android font sizes are expressed in "sp" units
//       return `${prop.value}px`;
//   }
// });

// StyleDictionary.registerTransform({ // this is a silly example, to show how you can apply transform to names
//   name: 'name/squiggle',
//   type: 'name',
//   // notice: if you don't specify a matcher, the transformation will be applied to all the properties
//   transformer: function(prop) {
//       return prop.path.join('~');
//   }
// });

// // REGISTER THE CUSTOM TRANFORM GROUPS

// // if you want to see what a pre-defined group contains, uncomment the next line:
// // console.log(StyleDictionary.transformGroup['group_name']);

// StyleDictionary.registerTransformGroup({
//   name: 'custom/web',
//   // notice: here the "size/px" transform is not the pre-defined one, but the custom one we have declared above
//   transforms: ['attribute/cti', 'name/cti/constant', 'size/px', 'color/css', 'time/seconds', 'ratio/%']
// });

// StyleDictionary.registerTransformGroup({
//   name: 'custom/scss',
//   // this is to show one possibility for adding a few transforms to a pre-defined group
//   // (however, we suggest to use the previous approach, which is more explicit and clear)
//   transforms: StyleDictionary.transformGroup['scss'].concat(['size/px', 'ratio/%'])
// });

// StyleDictionary.registerTransformGroup({
//   name: 'custom/android',
//   // as you can see, here we are completely ignoring the "attribute/cti" transform (it's totally possible),
//   // because we are relying on custom attributes for the matchers and the custom format for the output
//   transforms: ['name/squiggle', 'hexRGB/hexARGB', 'unitless/dp-sp']
// });

// // REGISTER A CUSTOM FORMAT (to be used for this specific example)

// StyleDictionary.registerFormat({
//   name: 'custom/android/xml',
//   formatter: function(dictionary) {
//     return dictionary.allProperties.map(function(prop) {
//       return `<item name="${prop.name}">${prop.value}</item>`;
//     }).join('\n');
//   }
// });

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
StyleDictionaryExtended = StyleDictionary.extend(__dirname + "/config.json")

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms()

console.log("\n==============================================")
console.log("\nBuild completed!")
