<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FrontController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('front/index.html.twig', [
            'controller_name' => 'FrontController',
        ]);
    }

    /**
     * @Route("/association", name="association")
     */
    public function association()
    {
        return $this->render('front/association.html.twig', [
            'controller_name' => 'FrontController',
        ]);
    }
}