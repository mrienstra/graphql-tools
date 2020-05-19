(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{148:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return s})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return m}));var n=a(2),r=a(9),c=(a(0),a(167)),o={id:"remote-schemas",title:"Remote schemas",description:"Generate GraphQL schema objects that delegate to a remote server"},s={id:"remote-schemas",title:"Remote schemas",description:"Generate GraphQL schema objects that delegate to a remote server",source:"@site/docs/remote-schemas.md",permalink:"/docs/remote-schemas",editUrl:"https://github.com/ardatan/graphql-tools/edit/master/website/docs/remote-schemas.md",sidebar:"someSidebar",previous:{title:"Schema delegation",permalink:"/docs/schema-delegation"},next:{title:"Schema transforms",permalink:"/docs/schema-transforms"}},i=[{value:"Creating an executor",id:"creating-an-executor",children:[]},{value:"Using cross-fetch",id:"using-cross-fetch",children:[]},{value:"API",id:"api",children:[{value:"makeRemoteExecutableSchema(options)",id:"makeremoteexecutableschemaoptions",children:[]},{value:"introspectSchema(executor, context)",id:"introspectschemaexecutor-context",children:[]}]},{value:"Creating a subscriber",id:"creating-a-subscriber",children:[]}],l={rightToc:i};function m(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"It can be valuable to be able to treat remote GraphQL endpoints as if they were local executable schemas. This is especially useful for ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/schema-stitching/"}),"schema stitching"),", but there may be other use cases."),Object(c.b)("p",null,"Generally, to create a remote schema, you need three steps:"),Object(c.b)("ol",null,Object(c.b)("li",{parentName:"ol"},"Create a ",Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"#creating-a-executor"}),"executor")," that can retrieve results from that schema"),Object(c.b)("li",{parentName:"ol"},"Use ",Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"#introspectschemaexecutor-context"}),Object(c.b)("inlineCode",{parentName:"a"},"introspectSchema"))," to get the schema of the remote server"),Object(c.b)("li",{parentName:"ol"},"Use ",Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"#makeremoteexecutableschemaoptions"}),Object(c.b)("inlineCode",{parentName:"a"},"makeRemoteExecutableSchema"))," to create a schema that uses the executor to delegate requests to the underlying service"),Object(c.b)("li",{parentName:"ol"},"Create a ","[subscriber][#creating-a-subscriber]"," that can retrieve real time results from that schema (Optional only if you are using GraphQL Subscriptions)")),Object(c.b)("h3",{id:"creating-an-executor"},"Creating an executor"),Object(c.b)("p",null,"You can use an executor with an HTTP Client implementation (like cross-fetch). An executor is a function capable of retrieving GraphQL results. It is the same way that a GraphQL Client handles fetching data and is used by several ",Object(c.b)("inlineCode",{parentName:"p"},"graphql-tools")," features to do introspection or fetch results during execution."),Object(c.b)("p",null,"We've chosen to split this functionality up to give you the flexibility to choose when to do the introspection step. For example, you might already have the remote schema information, allowing you to skip the ",Object(c.b)("inlineCode",{parentName:"p"},"introspectSchema")," step entirely. Here's a complete example:"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"type Executor = (operation: Operation) => Promise<ExecutionResult>;\n\ntype Operation {\n  document: DocumentNode;\n  variables?: Object;\n  context?: Object;\n  info?: GraphQLResolveInfo\n}\n")),Object(c.b)("h3",{id:"using-cross-fetch"},"Using cross-fetch"),Object(c.b)("p",null,"Basic usage"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { fetch } from 'cross-fetch';\nimport { print } from 'graphql';\n\nconst executor = async ({ document, variables }) => {\n  const query = print(document);\n  const fetchResult = await fetch('http://example.com/graphql', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({ query, variables })\n  });\n  return fetchResult.json();\n};\n\nexport default async () => {\n  const schema = makeRemoteExecutableSchema({\n    schema: await introspectSchema(executor),\n    executor,\n  });\n  return schema\n}\n")),Object(c.b)("p",null,"Authentication headers from context"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { fetch } from 'cross-fetch';\nimport { print } from 'graphql';\n\nconst executor = async ({ document, variables, context }) => {\n  const query = print(document);\n  const fetchResult = await fetch('http://example.com/graphql', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': `Bearer ${context.authKey}`,\n    },\n    body: JSON.stringify({ query, variables, operationName })\n  });\n  return fetchResult.json();\n};\n\nexport default async () => {\n  const schema = makeRemoteExecutableSchema({\n    schema: await introspectSchema(executor),\n    executor,\n  });\n\n  return schema\n}\n")),Object(c.b)("h2",{id:"api"},"API"),Object(c.b)("h3",{id:"makeremoteexecutableschemaoptions"},"makeRemoteExecutableSchema(options)"),Object(c.b)("p",null,Object(c.b)("inlineCode",{parentName:"p"},"makeRemoteExecutableSchema")," takes a single argument: an object of options. The ",Object(c.b)("inlineCode",{parentName:"p"},"schema")," and a ",Object(c.b)("inlineCode",{parentName:"p"},"executor")," options are required."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { makeRemoteExecutableSchema } from 'graphql-tools';\n\nconst schema = makeRemoteExecutableSchema({\n  schema,\n  executor,\n});\n")),Object(c.b)("p",null,"Given a GraphQL.js schema (can be a non-executable client schema made by ",Object(c.b)("inlineCode",{parentName:"p"},"buildClientSchema"),") and a ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"#creating-an-executor"}),"executor"),", produce a GraphQL Schema that routes all requests to the executor."),Object(c.b)("p",null,"You can also pass a ",Object(c.b)("inlineCode",{parentName:"p"},"createResolver")," function to ",Object(c.b)("inlineCode",{parentName:"p"},"makeRemoteExecutableSchema")," to override how the fetch resolvers are created and executed. The ",Object(c.b)("inlineCode",{parentName:"p"},"createResolver")," param accepts an ",Object(c.b)("inlineCode",{parentName:"p"},"Executor")," as its first argument and returns a resolver function. This opens up the possibility for users to create batching mechanisms for fetches."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const createResolver: (executor: Executor) => GraphQLFieldResolver<any, any> = // . . .\n\nconst schema = makeRemoteExecutableSchema({\n  schema,\n  executor,\n  createResolver\n});\n")),Object(c.b)("h3",{id:"introspectschemaexecutor-context"},"introspectSchema(executor, ","[context]",")"),Object(c.b)("p",null,"Use ",Object(c.b)("inlineCode",{parentName:"p"},"executor")," to build a client schema using introspection query. This function makes it easier to use ",Object(c.b)("inlineCode",{parentName:"p"},"makeRemoteExecutableSchema"),". As a result, you get a promise to a non-executable GraphQL.js schema object. Accepts optional second argument ",Object(c.b)("inlineCode",{parentName:"p"},"context"),", which is passed to the executor; see the docs about executors above for more details."),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { introspectSchema } from 'graphql-tools';\n\nintrospectSchema(executor).then((schema) => {\n  // use the schema\n});\n\n// or, with async/await:\nconst schema = await introspectSchema(executor);\n")),Object(c.b)("h2",{id:"creating-a-subscriber"},"Creating a subscriber"),Object(c.b)("blockquote",null,Object(c.b)("p",{parentName:"blockquote"},"TODO")))}m.isMDXComponent=!0},167:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return h}));var n=a(0),r=a.n(n);function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)a=c[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),m=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s({},t,{},e)),a},u=function(e){var t=m(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=m(a),b=n,h=u["".concat(o,".").concat(b)]||u[b]||p[b]||c;return a?r.a.createElement(h,s({ref:t},l,{components:a})):r.a.createElement(h,s({ref:t},l))}));function h(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=a.length,o=new Array(c);o[0]=b;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var l=2;l<c;l++)o[l]=a[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}b.displayName="MDXCreateElement"}}]);