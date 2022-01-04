/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateLinkInput: { // input type
    description: string; // String!
    url: string; // String!
  }
  LoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  SignUpInput: { // input type
    email: string; // String!
    name: string; // String!
    password: string; // String!
  }
  UpdateLinkInput: { // input type
    description: string; // String!
    id: number; // Int!
    url: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Link: { // root type
    description: string; // String!
    id: number; // Int!
    postedById?: number | null; // Int
    url: string; // String!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Link: { // field return type
    description: string; // String!
    id: number; // Int!
    postedBy: NexusGenRootTypes['User'] | null; // User
    postedById: number | null; // Int
    url: string; // String!
  }
  Mutation: { // field return type
    createLink: NexusGenRootTypes['Link'] | null; // Link
    deleteLink: NexusGenRootTypes['Link'] | null; // Link
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signUp: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateLink: NexusGenRootTypes['Link'] | null; // Link
  }
  Query: { // field return type
    feed: Array<NexusGenRootTypes['Link'] | null> | null; // [Link]
    link: NexusGenRootTypes['Link'] | null; // Link
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    links: Array<NexusGenRootTypes['Link'] | null> | null; // [Link]
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Link: { // field return type name
    description: 'String'
    id: 'Int'
    postedBy: 'User'
    postedById: 'Int'
    url: 'String'
  }
  Mutation: { // field return type name
    createLink: 'Link'
    deleteLink: 'Link'
    login: 'AuthPayload'
    signUp: 'AuthPayload'
    updateLink: 'Link'
  }
  Query: { // field return type name
    feed: 'Link'
    link: 'Link'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    links: 'Link'
    name: 'String'
    password: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createLink: { // args
      data: NexusGenInputs['CreateLinkInput']; // CreateLinkInput!
    }
    deleteLink: { // args
      id: number; // Int!
    }
    login: { // args
      data: NexusGenInputs['LoginInput']; // LoginInput!
    }
    signUp: { // args
      data: NexusGenInputs['SignUpInput']; // SignUpInput!
    }
    updateLink: { // args
      data: NexusGenInputs['UpdateLinkInput']; // UpdateLinkInput!
    }
  }
  Query: {
    link: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}