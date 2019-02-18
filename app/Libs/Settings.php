<?php

namespace Bdg\Libs;

use Bdg\Models\Setting;

class Settings {
	protected $settings = [];

	function __construct() {
		foreach (Setting::all() as $setting) {
			$this->settings[$setting->code] = isset($this->settings[$setting->code]) ? $this->settings[$setting->code] : [];
			$this->settings[$setting->code][$setting->key] = $setting->serialize == 1 ? json_decode($setting->value) : $setting->value;
		}
	}

	public function get($code, $key) {
		if (isset($this->settings[$code], $this->settings[$code][$key])) {
			return $this->settings[$code][$key];
		}
		return '';
	}
}
