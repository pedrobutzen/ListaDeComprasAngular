<?php



header('Content-Type: application/json');



$db = mysqli_connect("localhost", "pedro728_compras", "root", "pedro728_compras") or die("Error " . mysqli_error($link));





$method = $_SERVER['REQUEST_METHOD'];



switch ($method) {

    case "GET":

        $query = "SELECT * FROM compras" or die("Erro na consulta." . mysqli_error($db));

        $result = mysqli_query($db, $query);

        $json = array();

        while ($row = mysqli_fetch_array($result)) {

            if ($row["comprado"] == "0") {

                $row["comprado"] = false;

            } else {

                $row["comprado"] = true;

            }

            $json_1 = array("comprado" => $row["comprado"], "produto" => utf8_encode($row["nome"]), "quantidade" => $row["quantidade"], "id" => $row["id"]);

            array_push($json, $json_1);

        }

        echo json_encode($json);

        break;

    case "POST":

        $decode = json_decode(file_get_contents('php://input'), true);



        $produto = utf8_decode($decode['produto']);

        $quantidade = $decode['quantidade'];



        $query = "INSERT INTO compras (id, nome, quantidade, comprado) VALUES (NULL, '$produto', '$quantidade', '0');" or die("Erro ao inserir." . mysqli_error($db));



        $result = mysqli_query($db, $query);



        $json = array();

        $json_1 = array("id" => mysqli_insert_id($db));

        array_push($json, $json_1);



        echo json_encode($json);

        break;

    case "PUT":



        break;

    case "DELETE":

        $id = $_GET['id'];



        $query = "DELETE FROM compras WHERE compras.id = '$id'" or die("Erro ao deletar." . mysqli_error($db));



        $result = mysqli_query($db, $query);

        break;

    default:

        break;

}

?>