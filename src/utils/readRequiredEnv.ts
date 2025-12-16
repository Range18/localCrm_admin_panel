export function readRequiredEnv(name: string): string {
    const v = (import.meta.env as any)[name] as string | undefined;
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}