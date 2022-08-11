<?php
//error_reporting(0);

use Mpdf\Tag\P;

session_set_cookie_params(60*60*24*7,"/");
session_start();
//require_once 'config.php';
define("MYSQLHOST", 	"10.0.18.21");
define("MYSQLPORT",     "3306");
define("MYSQLUSER",     "root");
define("MYSQLPASS",     "Gl-1114");
define("MYSQLDB",       "callapp");
define("MYSQLCHARSET",  "utf8");

class  dbClass{

    public $mysqli;

    public $host;
    public $port;
    public $user;
    public $password;
    public $db;

    public $charset;

    public $query;
    public $curTable;

    /**CONSTRUCTOR
     *
     * @param string  $host
     * @param string  $user
     * @param string  $password
     * @param string  $db
     * @param integer $port
     * @param string  $charset
     * @throws Exception
     */
    public function __construct($host=MYSQLHOST, $user=MYSQLUSER, $password=MYSQLPASS, $db=MYSQLDB, $port=MYSQLPORT, $charset=MYSQLCHARSET){

        $this->host     = $host;
        $this->port     = $port;
        $this->user     = $user;
        $this->password = $password;
        $this->db       = $db;

        $this->charset  = $charset;

        if (empty($this->host) || empty($this->user) || empty($this->password) || empty($this->db)) {
            throw new Exception('Empty Parameters');
        }

        $this->mysqli = new mysqli($this->host, $this->user, $this->password, $this->db, $this->port);

        if ($this->mysqli->connect_error) {
            throw new Exception('Connect Error ' . $this->mysqli->connect_errno . ': ' . $this->mysqli->connect_error);
        }

        if ($this->mysqli) {
            $this->mysqli->set_charset($this->charset);
        }else{
            throw new Exception('SET Charset ERROR');
        }
    }
    function escape_string($str = ''){
        return $this->mysqli->real_escape_string($str);
    }
    /**SET QUERY
     *
     * @param string $query
     */
    function setQuery($query, $table='') {
        if($table != '')
		{
			$this->curTable = $table;
		}
        if ($query=='') {
            throw new Exception('MySQLi query empty');
        }else{
			$this->query = $query;
        }
    }

    /**Get Last INSERT Id
     *
     *
     */
    function getLastId() {
        return $this->mysqli->insert_id;
    }

    /**EXECUTE MYSQL QUERY
     *
     * @throws Exception
     */
    function execQuery() {

        $this->mysqli->query($this->query);

        if ($this->mysqli->error) {
            throw new Exception($this->mysqli->error." ::: Query -> ".$this->query);
        }else {
            return $this->mysqli->info;
        }
     }


    /**GET QUERY RESULT NUMERIC ARRAY
     *
     * @param INT $type
     * @throws Exception
     * @return array $fetchArray
     */
    function getResultArray($type=MYSQLI_ASSOC){
    
        $fetchArray = array();
        $result     = $this->mysqli->query($this->query);
    
        if ($result) {
            $start = microtime();
            $count = 0;
    
            $fetchArray['result'] = NULL;
            while($row = $result->fetch_array($type)){
                $fetchArray['result'][] = $row;
                $count++;
            }
			
			if(!empty($this->curTable))
			{
				$request = $this->mysqli->query("SHOW COLUMNS FROM ".$this->curTable);
				if($request)
				{
					$i = 0;
					while($r = $request->fetch_array($type)){
						if(strpos($r['Type'], 'int') !== false)							///
						{																///
							$fetchTableColumns[] = 'number';							/// MAPPING OF DATA TYPES KENDOUI
						}																///
						else if(strpos($r['Type'], 'varchar') !== false){				///
							$fetchTableColumns[] = 'string';
						}
						else if(strpos($r['Type'], 'date') !== false){
							$fetchTableColumns[] = 'date';
						}
						$i++;
					}
				}
				else
				{
					$fetchTableColumns = 'FAILED MYSQLI->QUERY';
				}
				
			}
			else
			{
				$fetchTableColumns = 'Empty table name';
			}
			
			
			$fetchArray['data_type'] = $fetchTableColumns;
            $fetchArray['time']  = round(microtime() - $start, 4);
            $fetchArray['count'] = $count;

            return $fetchArray;
    
        }else {
            self::disconnect();
            throw new Exception($this->mysqli->error." ::: Query -> ".$this->query);
        }
    }

    /**GET JSON FROM ASSOC ARRAY RESULT
     *
     * @param INT $type
     * @return json $array
     */
    function getJson($type=ASSOC){

        if ($type == ASSOC) {
            $array = self::getResultArray(MYSQLI_ASSOC);
        }elseif ($type == NUM){
            $array = self::getResultArray(MYSQLI_NUM);
        }else{
            throw new Exception('Unknow type!');
        }

        $encodedArray   = json_encode($array, JSON_NUMERIC_CHECK);

        if ($encodedArray) {
            return $encodedArray;
        }else{
            throw new Exception('JSON ecode failed!');
        }

    }

    //get list array
    function getList($count, $hidden, $checkbox=0){
        $data    = array("aaData" => array());
        $result  = $this->mysqli->query($this->query);

        if($result){
            $start = microtime();
            $rowcount = 0;
            while($aRow = $result->fetch_array(MYSQLI_NUM)){
                $row = array();

                if ($hidden === "no") {
                    for ($i = 0 ; $i < $count ; $i++){
                        /* General output */
                        $row[0] = 0;
                        $row[$i+1] = $aRow[$i];
                        if ($checkbox == 1) {
                            if($i == ($count - 1)){
                                $row[] = '<div class="callapp_checkbox">
                                              <input type="checkbox" id="callapp_checkbox_'.$aRow[$hidden].'" name="check_'.$aRow[$hidden].'" value="'.$aRow[$hidden].'" class="check" />
                                              <label for="callapp_checkbox_'.$aRow[$hidden].'"></label>
                                          </div>';
                            }
                        }
                    }
                    $data['aaData'][] = $row;
                    $rowcount++;
                }else{
                    for ($i = 0 ; $i < $count ; $i++){
                        /* General output */
                        $row[] = $aRow[$i];
                        if ($checkbox == 1) {
                            if($i == ($count - 1)){
                                $row[] = '<div class="callapp_checkbox">
                                              <input type="checkbox" id="callapp_checkbox_'.$aRow[$hidden].'" name="check_'.$aRow[$hidden].'" value="'.$aRow[$hidden].'" class="check" />
                                              <label for="callapp_checkbox_'.$aRow[$hidden].'"></label>
                                          </div>';
                            }
                        }
                    }
                    $data['aaData'][] = $row;
                    $rowcount++;
                }
            }

            $data['time']  = round(microtime() - $start, 4);
            $data['count'] = $rowcount;

            return $data;

        }else{
            self::disconnect();
            throw new Exception($this->mysqli->error." ::: Query -> ".$this->query);
        }
    }
    function getKendoList($count,$cols){
        $result  = $this->mysqli->query($this->query);
        $data = array();
        $bidgata = array();
        $f=0;

        $column = explode(',',$cols[0]);
        foreach($column AS $col)
        {
            $subcol = explode(':',$col);
            $colName[] = $subcol[0];
        }
        
        if($result){
            $start = microtime();
            $rowcount = 0;
            while($aRow = $result->fetch_array(MYSQLI_NUM)){
                $row = array();
                for ($i = 0 ; $i < $count ; $i++){
                    $row[$colName[$i]] = $aRow[$i];
                }
                $bigdata[] = $row;
                $rowcount++;
            }
            $data = array('data'=>$bigdata,'total'=>$rowcount);

            

            return $data;

        }else{
            self::disconnect();
            throw new Exception($this->mysqli->error." ::: Query -> ".$this->query);
        }
    }

    /**GET RESULT ROW NUMBERS
     *
     * @throws Exception
     * @return integer $row
     */
    function getNumRow(){

        $result = $this->mysqli->query($this->query);

        if ($result) {
            $row = $result->num_rows;
            return $row;
        }else{
            throw new Exception($this->mysqli->error." ::: Query -> ".$this->query);
        }
    }

    /**GET TABLE CURRENT INCREMENT VALUE
     *
     * @param  string  $table
     * @return integer $increment
     */
    function getIncrement($table){

        $result    = $this->mysqli->query("SHOW TABLE STATUS LIKE '$table'");
        $row       = $result->fetch_assoc();
        $increment = $row['Auto_increment'];

        return $increment;
    }

    /**SET TABLE INCREMENT VALUE
     *
     * @param  string  $table
     * @return integer $increment
     */
    function setIncrement($table){

        $increment = self::getIncrement($table);
        $next_increment = $increment+1;
        $this->mysqli->query("ALTER TABLE $table AUTO_INCREMENT=$next_increment");

        return $increment;

    }

    /**GROUP RESULT BY COLUMN PARAMETER
     *
     * @param  string $column
     * @return array  $groupArray
     */
    function groupBy($column){

        $groupArray = array();

        foreach (self::getFetchArray() as $row){

            $i   = 0;
            $key = 0;

            foreach ($groupArray as $grouprow){

                if ($row[$column] == $grouprow[$column]) {
                    $key = $i;
                }

                $i++;
            }

            if ( $key > 0 ) {
                $groupArray[$key]['count'] += 1;
             }else {
                $groupArray[] = $row;
            }
        }

        return $groupArray;
    }

    /**Chosens options
     * @param Int $id - Selected
     * @param String $selects - Options
     * @return Chosen options HTML
     */

    function getSelect($id,$selects="name"){


        $req = $this->mysqli->query($this->query);

        $data = '<option value="0" >----</option>';

        $ids = explode(',', $id);
        
        if ($req){
            while ($res = $req->fetch_array()) {

                if (in_array($res['id'], $ids)) {
                    $data .= '<option value="' . $res['id'] . '" selected="selected">' . $res[$selects] . '</option>';
                } else {
                    $data .= '<option value="' . $res['id'] . '">' . $res[$selects] . '</option>';
                }
            }
        }
        else {
            throw new Exception($this->mysqli->error." ::: Query -> ".$query);
        }

        return $data;
    }

    /**
     * disconnect mysql server
     */
    function disconnect(){

        $this->mysqli->close();

    }

    function escp($string){
        return $this->mysqli->real_escape_string($string);
    }

}

?>
