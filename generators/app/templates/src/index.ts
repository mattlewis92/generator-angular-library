export * from './<%- ngModuleFilename.replace('.ts', '') %>';

// all components that will be codegen'd need to be exported for AOT to work
export * from './helloWorld.component';