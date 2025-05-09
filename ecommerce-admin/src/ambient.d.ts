type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;
