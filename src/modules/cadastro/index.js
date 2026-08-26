import EmpresaRouter from "./empresa/empresa.routes.js";
import FornecedorRouter from "./fornecedor/fornecedor.routes.js";
import RegimeTRouter from "./regimeTributario/regimeT.routes.js";

const CadastroRoutes = [
    {
        module: "cadastro",
        path: "/empresa",
        router: EmpresaRouter
    },
    {
        module: "cadastro",
        path: "/fornecedor",
        router: FornecedorRouter
    },
    {
        module: "cadastro",
        path: "/regimeT",
        router: RegimeTRouter
    }
];

export default CadastroRoutes;