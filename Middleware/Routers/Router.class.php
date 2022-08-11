<?php

namespace Middleware\Routers;

use Middleware\Routers\dbClass;
use Exception;
use Middleware\Helpers\language\language;

class Router extends dbClass
{


	/**
	 * get VIEW PAGE from DB
	 *
	 * @param [Number] $user_id
	 * @param [Number] $page_id
	 * @return void
	 */
	public function reqPage($user_id, $page_id)
	{

		parent::setQuery("	SELECT page_group.name AS dest, pages.name
							FROM   users 
                            JOIN   group_permission ON users.group_id = group_permission.group_id
							JOIN   pages ON group_permission.page_id = pages.id
							JOIN   page_group ON pages.page_group_id = page_group.id 
							WHERE  users.id = $user_id AND pages.id = $page_id");

		$row = parent::getResultArray();

		if ($row['count'] > 0) {
			$_SESSION['PAGEID'] = $page_id;
			$group = $row['result'][0]['dest'];
			$name = $row['result'][0]['name'];

			if ($group == "root") {
				$group = '';
			} else {
				$group .= "/";
			}

			print "<section content>";
			print $this->runCss($name, $group);

			if (file_exists('Frontend/Views/pages/' . $group . $name . "/index.php")) {
				require_once 'Frontend/Views/pages/' . $group . $name . "/index.php";
			}

			print $this->runJs($name, $group, $page_id);

			print "</section>";
		} else {

			require_once 'Frontend/Views/pages/404.html';
		}
	}


	public function test($user_id, $page_id)
	{

		parent::setQuery("	SELECT page_group.name AS dest, pages.name
							FROM   users 
                            JOIN   group_permission ON users.group_id = group_permission.group_id
							JOIN   pages ON group_permission.page_id = pages.id
							JOIN   page_group ON pages.page_group_id = page_group.id 
							WHERE  users.id = $user_id AND pages.id = $page_id");

		$row = parent::getResultArray();

		if ($row['count'] > 0) {
			$_SESSION['PAGEID'] = $page_id;
			$group = $row['result'][0]['dest'];
			$name = $row['result'][0]['name'];

			if ($group == "root") {
				$group = '';
			} else {
				$group .= "/";
			}

			$section = '';

			$section .= "<section content>";
			$section .= $this->runCss($name, $group);

			if (file_exists('Frontend/Views/pages/' . $group . $name . "/index.php")) {
				$section .= file_get_contents('Frontend/Views/pages/' . $group . $name . "/index.php");
			}

			$section .= $this->runJs($name, $group, $page_id);

			$section .= "</section>";

			return $section;
		} else {

			return file_get_contents('Frontend/Views/pages/404.html');
		}
	}


	/**
	 * Run Js for View Page
	 *
	 * @param [String] $name
	 * @return void
	 */
	static function runJs($name, $group, $page_id = null)
	{
		$lang = new Language();
		$langData = $lang->getLanguageData($page_id);

		// var_dump($langData);

		if (file_exists('Frontend/Assets/js/pages/' . $group . $name . "/" . $name . '.class.js')) {

			return '<script type="module">
								import ' . $name . ' from "./Frontend/Assets/js/pages/' . $group . $name . '/' . $name . '.class.js?version=2.0.0"
								new ' . $name . '(' . json_encode($langData) . ')
						</script>';
		}
	}

	static function runCss($name, $group)
	{
		if (file_exists('Frontend/Assets/css/page/' . $group . $name . "/" . $name . '.css')) {

			return '<link rel="stylesheet" href="Frontend/Assets/css/page/' . $group . $name . "/" . $name . '.css">';
		}
	}


	public function getWelcomePage($user_id = 1)
	{

		parent::setQuery("	SELECT    `group_wellcome_page`.`page_id` 
												FROM      `users`
												LEFT JOIN `group_wellcome_page` ON `group_wellcome_page`.`group_id` = `users`.`group_id`
												WHERE     `users`.`id` = $user_id
												LIMIT 1");

		$result = parent::getResultArray();

		return $result['result'][0];
	}

	public function getAuthPage()
	{
		return include("Frontend/Views/pages/authorization/index.php");
	}
}
