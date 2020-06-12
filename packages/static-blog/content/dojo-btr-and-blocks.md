---
title: Creating your Dojo blog
date: 2019-09-01
author: The Dojo Team
description: Template blog built with Dojo using build time rendering and Dojo blocks.
tags: javascript, web development, dojo
image: assets/dojo-btr-and-blocks.jpg
---

# What is build time rendering?

​
Build time rendering statically renders your application during the build process, inlining the resulting HTML and CSS into the application's index file.
​
BTR is setup using your project's `.dojorc` configuration file found at the root of the project:
​

```json
{
	"build-app": {
		"build-time-render": {
			"root": "app"
		}
	}
}
```

The `root` is the id of a DOM node that the application is mounted on. This will render the default route of the application. Additional routes can get added using the `paths` property.
​

```json
{
	"build-app": {
		"build-time-render": {
			"root": "app",
			"paths": ["blog/dojo-btr-and-blocks"]
		}
	}
}
```

​
Does a blog site that is statically rendered need JavaScript? Possibly not! To elide all JavaScript and CSS from the statically rendered output, set the `static` flag to `true`.
​

```json
{
	"build-app": {
		"build-time-render": {
			"root": "app",
			"static": true,
			"paths": ["blog/dojo-btr-and-blocks"]
		}
	}
}
```

For more information the docs for [build time rendering can be found here](https://dojo.io/learn/building/buildtime-rendering).
​

# What do Dojo blocks do?

​
In combination with BTR, [Dojo blocks](https://dojo.io/learn/building/buildtime-rendering#dojo-blocks) offer a way to execute functions, known as blocks, in Node.js when the application is rendered at build time. The blocks are used directly in Dojo widgets, using the `block` middleware. The result of each block is written to a seperate bundle and loaded lazily as required.
​
To be used as a block a module needs to have a `.block.ts` extension and a default export for the block function.
​

```ts
// src/my-block.block.ts
export default function (foo: string) {
	// do your block things
}
```

​
Using the `block` middleware, this function gets called in a widget so that the block gets executed at build time. Then at runtime the resulting bundle instead gets loaded. The typings for the function signature and the return type are all inferred from the block.
​

```tsx
import { create, tsx } from '@dojo/framework/core/vdom';
import myBlock from './my-block.block.ts';
const factory = create({ block });
const MyBlockWidget = factory(function MyBlockWidget({ middleware: { block } }) {
	// the block will be undefined the first render as the blocks are
	// async so need provide a default value
	const results = block(myBlock)('fooParam') || {};
	// do something with the results
	return <div>JSON.stringify(results)</div>;
});
```

# Getting started with the Dojo blog template

If you love the look and feel or just want to get started writing some amazing content, you can start using this template to add your blogs to the `content` folder in the project root!
​
The content is written in markdown with some basic meta information required at the top of the file:
​

```yml
---
title: The blog title
date: 2019-09-01
author: You!
description: Small description of the topic
tags: some, useful, tags, split, by, comma,
image: https://the.image.url
---
​
```

​
Once you are ready to publish, add the new blog to the `paths` setting in the `.dojorc` and deploy right from codesandbox using netlify ❤️.
​

# Customizing the template

The content gets rendered using [`rehype`](https://github.com/rehypejs/rehype) and [`remark`](https://github.com/remarkjs/remark). To customize the output additional plugins can get added to the pipeline in the `src/blocks/blog.block.ts` module.

# What next?

If you have enjoyed this blog template or just want to learn more or get involved with Dojo, you can check out the docs on [dojo.io](https://dojo.io) and reach out to us on [github](https://github.com/dojo/framework) and [discord](https://discord.gg/M7yRngE).

We look forward to seeing you ❤️!
