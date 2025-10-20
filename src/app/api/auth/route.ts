export async function GET(request: Request) {
    const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
    return Response.json(users);
}

export async function POST(request: Request) {
    const data = await request.json();
    console.log("Nuevo usuario:", data);
    return Response.json({ message: "Usuario creado", token: "token_de_ejemplo" }, { status: 201 });
}
